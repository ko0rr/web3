import React from "react";
import {InputText} from "primereact/inputtext";
import {Slider} from "primereact/slider";
import {Controller} from "react-hook-form";

const floatPattern =/^-?((\d+(\.\d*)?)|(\.\d+))$/;
export function YForm({control, errors, yShowError}) {
    return (
        <Controller
            name="y"
            control={control}
            rules={{
                required: "Координата Y обязательна",
                validate: (value) => {
                    const num = Number(value);
                    if (isNaN(num)) return "Координата Y должна быть числом";
                    if (num < -5 || num > 5) return "Координата Y должна быть в диапазоне [-5; 5]";
                }
            }}
            render={({field}) => (
                <div id="choice_of_y">
                    <div id="label_input_container">
                        <span className="label_name">Выберите Y:</span>
                        <InputText
                            value={field.value ?? ""}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value === "" || value === "-" || value === ".") {
                                    field.onChange(value);
                                    return;
                                }
                                if (floatPattern.test(value)) {
                                    field.onChange(value);
                                }
                            }}
                        />
                    </div>
                    <div className="y_slider_container">
                        <Slider
                            id="y"
                            name="y"
                            value={Number(field.value) || 0}
                            min={-5}
                            max={5}
                            step={0.01}
                            onChange={(e) => {
                                field.onChange(e.value)
                            }}
                        />
                    </div>
                    {yShowError && errors.y && (
                        <div className="error_base error show">{errors.y.message}</div>
                    )}
                </div>
            )}
        />
    );
}