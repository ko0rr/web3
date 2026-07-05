import React, {useRef, useEffect, useState} from "react";
import {canvasSize, center, drawPointOnCoordinatePlane, redraw} from "../../utility/canvas";
import {useErrorVisibility} from "../../hooks/useErrorVisibility";
import "../../style.css";

export function Canvas({r, points, formHandlers}) {
    const {addPoint} = formHandlers;
    const [errorMessage, setErrorMessage] = useState(null);
    const showError = useErrorVisibility(errorMessage);
    const canvasRef = useRef(null);

    const showCanvasError = (message) => {
        setErrorMessage(null);
        setTimeout(() => {
            setErrorMessage(message)
        }, 10);
    };

    const handleCanvasClick = (event, canvasRef, r) => {
        if (r === null || isNaN(r)) {
            showCanvasError("Нужно сначала выбрать радиус");
            return null;
        } else if (r <= 0) {
            showCanvasError("Радиус R должен быть больше 0");
            return null;
        }
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const gridCellsPerRadius = 2;
        const scale = (canvasSize / 2) / (r * gridCellsPerRadius);
        const offset = 2;
        const x_px = event.clientX - rect.left - offset;
        const y_px = event.clientY - rect.top - offset;
        const realX = (x_px - center) / scale;
        const realY = -((y_px - center) / scale);
        const x = parseFloat(realX.toFixed(4));
        const y = parseFloat(realY.toFixed(4));
        if (x < -3 || x > 4) {
            showCanvasError("Координата X должна быть в диапазоне [-3; 4]");
            return null;
        }
        if (y <= -5 || y >= 5) {
            showCanvasError("Координата Y должна быть в диапазоне [-5; 5]");
            return null;
        }
        return {x, y};
    };

    const sendCanvasClick = async (event) => {
        const result = handleCanvasClick(event, canvasRef, r);
        if (!result) return;
        const {x, y} = result;
        try {
            await addPoint({x, y, r}).unwrap();
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        redraw(r > 0 ? r : null, ctx);

        if (points.length > 0) {
            const gridCellsPerRadius = 2;
            const scale = (canvasSize / 2) / (r * gridCellsPerRadius);
            points.filter(p => p.r === r).forEach((p) => drawPointOnCoordinatePlane(ctx, p.x, p.y, p.hit, scale));
        }
    }, [r, points]);

    return (
        <div id="main_canvas">
            <canvas ref={canvasRef} width="400" height="400" onClick={sendCanvasClick}></canvas>
            <div className="error_container">
                {errorMessage && (
                    <div id="canvas_error" className={`error_base ${showError ? 'show' : ''}`}> {errorMessage} </div>
                )}
            </div>
        </div>
    );
}