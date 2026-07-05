import React from "react";
import {MainContainer} from "../main/MainContainer";
import {Header} from "../elements/Header";
import {LogoutButton} from "../elements/LogoutButton";
import {MainForm} from "../main/MainForm";

export function MainPage() {
    return (
        <MainContainer>
            <Header/>
            <LogoutButton/>
            <MainForm />
        </MainContainer>
    );
}