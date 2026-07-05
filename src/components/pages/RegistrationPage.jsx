import React, {useState} from "react";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import {Header} from "../elements/Header";
import {MainContainer} from '../main/MainContainer';
import {useRegisterMutation} from "../../store/api/authApi";
import {AuthInput} from "../auth/AuthInput";
import {ServerErrorMessage} from "../error/ServerErrorMessage";
import {useNavigate} from "react-router-dom";
import "../../style.css";

export function RegistrationPage() {
    const loginPattern = /^[a-zA-Z0-9._-]+$/;
    const passwordPattern = /^[a-zA-Z0-9#$%&@~?!_]+$/;

    const [registerUser] = useRegisterMutation();
    const {register, handleSubmit, formState: {errors}} = useForm({mode: "onSubmit", reValidateMode: "onSubmit"});

    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setErrorMessage("");
        try {
            await registerUser(data).unwrap();
            navigate("/login", {
                state: {
                    successMessage: "Регистрация прошла успешно! Теперь вы можете войти."
                }
            })

        } catch (error) {
            let message = "Произошла неизвестная ошибка регистрации.";

            if (error && error.data) {
                if (error.data.message) {
                    message = error.data.message;
                }
            }

            setErrorMessage(message);
        }
    };

    return (
        <MainContainer>
            <Header />
            <form className="login_form" onSubmit={handleSubmit(onSubmit)}>
                <AuthInput
                    name="username"
                    type="text"
                    placeholder="Введите логин"
                    register={register}
                    error={errors.username}
                    autocomplete="off"
                    rules={{
                        required: "Логин обязателен",
                        minLength: {
                            value: 5,
                            message: "Должно быть минимум 5 символов"
                        },
                        pattern: {
                            value: loginPattern,
                            message: "Должны быть только английские буквы, цифры и . _ -"
                        }
                    }}
                />
                <AuthInput
                    name="password"
                    type="password"
                    placeholder="Введите пароль"
                    register={register}
                    error={errors.password}

                    autocomplete="new-password"
                    rules={{
                        required: "Пароль обязателен",
                        minLength: {
                            value: 8,
                            message: "Должно быть минимум 8 символов"
                        },
                        pattern: {
                            value: passwordPattern,
                            message: "Должны быть только английские буквы, цифры и # $ % & @ ~ ? ! _"
                        }
                    }}
                />
                <div id="button_container">
                    <button type="submit" id="login_button">Зарегистрироваться</button>
                    <Link to="/login" className="swicth_button">Войти</Link>
                </div>
                <ServerErrorMessage errorMessage={errorMessage} />
            </form>
        </MainContainer>
    );
}