import React from "react";
import {useErrorVisibility} from "../../hooks/useErrorVisibility";
import "../../style.css";

export function AuthInput({name, type, label, placeholder, register, rules, error, autocomplete}) {
    const showError = useErrorVisibility(error)
    return (
        <div className="form_group" id={name}>
            {label && <label htmlFor={name}>{label}</label>}
            <input
                type={type}
                id={name}
                placeholder={placeholder}
                autocomplete={autocomplete}
                {...register(name, rules)}
            />
            {error && (
                <div className={`error_base error ${showError ? "show" : ""}`} key={error.message}>
                    {error.message}
                </div>
            )}
        </div>
    );
}