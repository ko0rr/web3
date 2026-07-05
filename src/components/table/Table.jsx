import React from "react";
import "../../style.css";

export function Table({points}) {
    return (
        <div id="table_container">
            <table>
                <thead>
                <tr>
                    <th>X</th>
                    <th>Y</th>
                    <th>R</th>
                    <th>Попал?</th>
                    <th>Текущая дата</th>
                    <th>Время работы скрипта</th>
                </tr>
                </thead>
                <tbody id="body_for_table">
                {points.map((point, index) => (
                    <tr key={index}>
                        <td>{point.x}</td>
                        <td>{point.y}</td>
                        <td>{point.r}</td>
                        <td style={{color: point.hit ? "#79d34a" : "#bc2929"}}>{point.hit ? 'Да': 'Нет'}</td>
                        <td>{point.serverTime}</td>
                        <td>{point.scriptTime}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}