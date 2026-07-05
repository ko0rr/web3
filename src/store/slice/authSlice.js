import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: null,
    accessToken: null,
    isAuthenticated: false
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.accessToken = action.payload.accessToken
            state.user = {username: action.payload.username}
            state.isAuthenticated = true
        },
        logoutUser: (state) => {
            state.user = null
            state.accessToken = null
            state.isAuthenticated = false
        },
        updateAccessToken: (state, action) => {
            state.accessToken = action.payload
        }
    },
});

export const {loginUser, logoutUser, updateAccessToken} = authSlice.actions;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export default authSlice.reducer;