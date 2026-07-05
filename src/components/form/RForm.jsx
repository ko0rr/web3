import React from "react";
import {Controller} from "react-hook-form";
import {Dropdown} from "primereact/dropdown";

export function RForm({control, errors, rItems, rShowError}) {
    return (
        <div id="choice_of_r">
            <span className="label_name">Выберите R:</span>
            <Controller
                name="r"
                control={control}
                rules={{
                    required: "Радиус R обязателен",
                    validate: (value) => {
                        if (value <= 0) return "Радиус R должен быть больше 0"
                    }
                }}
                render={({field}) => (
                    <Dropdown
                        id="r"
                        value={field.value}
                        onChange={(e) => field.onChange(e.value)}
                        options={rItems}
                        optionLabel="label"
                        optionValue="value"
                    />
                )}
            />
            {rShowError && errors.r && (
                <div className="error_base error show">{errors.r.message}</div>
            )}
        </div>
    );
}