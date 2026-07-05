import React from "react";
import {Controller} from "react-hook-form";
import {Dropdown} from "primereact/dropdown";

export function XForm({control, xItems, errors, xShowError}) {
    return (
        <div id="choice_of_x">
            <span className="label_name">Выберите X:</span>
            <Controller
                name="x"
                control={control}
                rules={{
                    required: "Координата X обязательна"
                }}
                render={({field}) => (
                    <Dropdown
                        id="x"
                        name="x"
                        value={field.value}
                        onChange={(e) => field.onChange(e.value)}
                        options={xItems}
                        optionLabel="label"
                        optionValue="value"
                    />
                )}
            />
            {xShowError && errors.x && (
                <div className="error_base error show">{errors.x.message}</div>
            )}
        </div>
    );
}