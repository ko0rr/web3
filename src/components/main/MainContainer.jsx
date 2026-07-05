import React from "react";
import "../../style.css";

export function MainContainer({children}) {
    return (
        <div id="main_container">
            {children}
        </div>
    );
}