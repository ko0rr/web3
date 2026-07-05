import React, {useEffect, useState} from "react";
import {useNavigate, Link, useLocation} from "react-router-dom";
import {useForm} from "react-hook-form";
import {Header} from "../elements/Header";
import {MainContainer} from "../main/MainContainer";
import {ServerErrorMessage} from "../error/ServerErrorMessage";
import {useSelector} from "react-redux";
import {useLoginMutation} from "../../store/api/authApi";
import {selectIsAuthenticated} from "../../store/slice/authSlice";
import {AuthInput} from "../auth/AuthInput";
import "../../style.css";

export function LoginPage() {
    const [login] = useLoginMutation();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const navigate = useNavigate();
    const location = useLocation();
    const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: {username: "", password: ""}, mode: "onSubmit", reValidateMode: "onSubmit"});

    const loginPattern = /^[a-zA-Z0-9._-]+$/;
    const passwordPattern = /^[a-zA-Z0-9#$%&@~?!_]+$/;

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        if (location.state?.successMessage) {
            setSuccessMessage(location.state.successMessage);
            navigate(location.pathname, { replace: true, state: {} });

            // Очищаем сообщение об успехе через 5 секунд
            const timer = setTimeout(() => setSuccessMessage(""), 5000);
            return () => clearTimeout(timer); // Очистка таймера
        }
    }, [location.state, navigate, location.pathname]);

    const onSubmit = async (data) => {
        setErrorMessage("");
        setSuccessMessage("");

        try {
            await login(data).unwrap();
        } catch (error) {
            let message = "Произошла неизвестная ошибка входа";

            if (error && error.data && error.data.message) {
                message = error.data.message;
            }
            setErrorMessage(message);
        }
    };

    useEffect(() => {
        if (isAuthenticated)
            navigate("/main");
    }, [isAuthenticated, navigate]);

    return (
        <MainContainer>
            <Header />
            <form className="login_form" onSubmit={handleSubmit(onSubmit)}>
                {successMessage && (
                    <div className="server_message success">
                        {successMessage}
                    </div>
                )}

                <AuthInput
                    name="username"
                    type="text"
                    label="Логин"
                    placeholder="Введите логин"
                    register={register}
                    error={errors.username}
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
                    label="Пароль"
                    placeholder="Введите пароль"
                    register={register}
                    error={errors.password}
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
                    <button type="submit" id="login_button">Войти</button>
                    <Link to="/register" className="swicth_button">Зарегистрироваться</Link>
                </div>
                <ServerErrorMessage errorMessage={errorMessage} />
            </form>
        </MainContainer>
    );
}