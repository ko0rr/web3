import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {logoutUser, updateAccessToken} from "./authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: '/api',
    credentials: 'include',
    prepareHeaders: (headers, {getState}) => {
        headers.set('Content-Type', 'application/json');
        const accessToken = getState().auth.accessToken;
        if (accessToken) {
            headers.set('Authorization', `Bearer ${accessToken}`);
        }
        return headers;
    },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (args.url.includes("/auth/login") || args.url.includes("/auth/register")) {
        return result;
    }
    if (!result.error || result.error.status !== 401){
        return result;
    }
    const refreshResult = await baseQuery(
        {
            url: "/auth/refresh",
            method: 'POST'
        }, api, extraOptions);
    if (refreshResult.data?.accessToken) {
        api.dispatch(updateAccessToken(refreshResult.data.accessToken));
        result = await baseQuery(args, api, extraOptions);
    } else {
        api.dispatch(logoutUser());
    }
    return result;
};

export const apiSlice = createApi({
    reducerPath: 'apiSlice',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Points'],
    endpoints: () => ({})
});