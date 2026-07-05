
const canvasSize = 400;
const lineWidth = 2;
const textMargin = 9;
const mainColor = '#857466';
const center = canvasSize / 2;
const gridCellsPerRadius = 2;

function setupCanvas(ctx) {
    ctx.font = '13px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    return ctx;
}

function drawGrid(ctx, scale) {
    ctx.strokeStyle = 'rgba(133, 116, 102, 0.5)';
    ctx.lineWidth = 1;
    const step = scale / gridCellsPerRadius;
    for (let i = 0; i <= canvasSize; i += step) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvasSize);
        ctx.stroke();
    }
    for (let j = 0; j <= canvasSize; j += step) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(canvasSize, j);
        ctx.stroke();
    }
}

function drawAxisLabels(ctx, r, scale) {
    let xLabel;
    let yLabel;
    const steps = [
        {value: -1, label: '-R'},
        {value: -0.5, label: '-R/2'},
        {value: 0.5, label: 'R/2'},
        {value: 1, label: 'R'}
    ];
    const tickLength = 6;
    ctx.fillStyle = mainColor;
    for (const element of steps) {
        const step = element;
        const xValue = center + step.value * scale * (r || 1);
        if (r) {
            xLabel = (step.value * r).toString();
        } else {
            xLabel = step.label;
        }
        ctx.fillText(xLabel, xValue, center + textMargin * 1.5);
        ctx.beginPath();
        ctx.moveTo(xValue, center - tickLength / 2);
        ctx.lineTo(xValue, center + tickLength / 2);
        ctx.closePath();
        ctx.stroke();
    }
    for (const element of steps) {
        const step = element;
        const yValue = center - step.value * scale * (r || 1);
        if (r) {
            yLabel = (step.value * r).toString();
        } else {
            yLabel = step.label;
        }
        ctx.fillText(yLabel, center - textMargin * 1.5, yValue);
        ctx.beginPath();
        ctx.moveTo(center - tickLength / 2, yValue);
        ctx.lineTo(center + tickLength / 2, yValue);
        ctx.closePath();
        ctx.stroke();
    }
}

function drawAxeOnCoordinatePlane(ctx, fromX, fromY, toX, toY) {
    const lengthOfHead = 10;
    const angle = Math.atan2(toY - fromY, toX - fromX);
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    const thirtyDegreeAngle = Math.PI / 6;
    const xForLeftPointer = toX - lengthOfHead * Math.cos(angle - thirtyDegreeAngle);
    const yForLeftPointer = toY - lengthOfHead * Math.sin(angle - thirtyDegreeAngle);
    ctx.lineTo(xForLeftPointer, yForLeftPointer);
    ctx.moveTo(toX, toY);
    const xForRightPointer = toX - lengthOfHead * Math.cos(angle + thirtyDegreeAngle);
    const yForRightPointer = toY - lengthOfHead * Math.sin(angle + thirtyDegreeAngle);
    ctx.lineTo(xForRightPointer, yForRightPointer);
    ctx.stroke();
}

function drawCoordinatePlane(ctx, r, scale) {
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = mainColor;
    drawAxeOnCoordinatePlane(ctx, 0, center, canvasSize, center);
    drawAxeOnCoordinatePlane(ctx, center, canvasSize, center, 0);
    drawAxisLabels(ctx, r, scale);
}

function convertIntoCanvasCoordinates(x, y, scale) {
    return [center + x * scale, center - y * scale];
}

function drawShapes(ctx, r, scale) {
    const rForDrawing = r || 1;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = 'rgba(133, 116, 102, 0.3)';
    ctx.fillStyle = 'rgba(227, 237, 250, 0.6)';
    ctx.beginPath();
    ctx.moveTo(center, center);
    let [x1, y1] = convertIntoCanvasCoordinates(-rForDrawing/2, 0, scale);
    ctx.lineTo(x1, y1);
    let [x2, y2] = convertIntoCanvasCoordinates(-rForDrawing/2, rForDrawing, scale);
    ctx.lineTo(x2, y2);
    let [x3, y3] = convertIntoCanvasCoordinates(0, rForDrawing, scale);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(center, center);
    let [x4, y4] = convertIntoCanvasCoordinates(0, rForDrawing/2, scale);
    ctx.lineTo(x4, y4);
    let [x5, y5] = convertIntoCanvasCoordinates(rForDrawing/2, 0, scale);
    ctx.lineTo(x5, y5);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.arc(center, center, rForDrawing/2 * scale, 0, Math.PI / 2, false);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

function drawPointOnCoordinatePlane(ctx, x, y, wasThereHit, scale) {
    if (wasThereHit) {
        ctx.fillStyle = '#C0E6B1';
    } else {
        ctx.fillStyle = '#D14545';
    }
    ctx.beginPath();
    let [newX, newY] = convertIntoCanvasCoordinates(x, y, scale);
    ctx.arc(newX, newY, 4, 0, 2*Math.PI);
    ctx.closePath();
    ctx.fill();
}

function redraw(r, ctx) {
    if (!ctx) return;
    setupCanvas(ctx);
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    const scale = (canvasSize / 2) / ((r || 1) * gridCellsPerRadius);
    drawGrid(ctx, scale);
    drawCoordinatePlane(ctx, r, scale);
    drawShapes(ctx, r, scale);
}

export {drawPointOnCoordinatePlane, redraw, center, canvasSize};
