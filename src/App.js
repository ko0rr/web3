import React from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {LoginPage} from "./components/pages/LoginPage";
import {RegistrationPage} from "./components/pages/RegistrationPage";
import {MainPage} from "./components/pages/MainPage";
import {ProtectedRouter} from "./components/router/ProtectedRouter";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route
                    path="/main"
                    element={
                        <ProtectedRouter>
                            <MainPage />
                        </ProtectedRouter>
                    }
                />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    );
}