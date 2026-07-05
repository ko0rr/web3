import React from "react";
import {useLogoutMutation} from "../../store/api/authApi";
import "../../style.css";

export function LogoutButton() {
    const [logout] = useLogoutMutation();

    const handleLogout = async () => {
        try {
            await logout().unwrap();
        } catch (error) {
            console.error("Ошибка при выходе: ", error);
        }
    };
    return (
        <div id="container_with_home_button">
            <button id="logout" onClick={handleLogout}></button>
        </div>
    );
}