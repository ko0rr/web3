import React from "react";
import {useErrorVisibility} from "../../hooks/useErrorVisibility";

export function ServerErrorMessage({errorMessage}) {
    const showError = useErrorVisibility(errorMessage);
    return (
        <div className="error_container">
            {errorMessage && (
                <div id="server_error" className={`error_base ${showError ? 'show' : ''}`}>
                    {errorMessage}
                </div>
            )}
        </div>
    );
}