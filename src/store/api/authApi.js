import {apiSlice} from "../slice/apiSlice";
import {loginUser, logoutUser} from "../slice/authSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        register: build.mutation({
            query: (credentials) => ({
                url: '/auth/register',
                method: 'POST',
                body: credentials
            })
        }),
        login: build.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials
            }),
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled;
                    dispatch(apiSlice.util.resetApiState());
                    dispatch(loginUser({
                        username: arg.username,
                        accessToken: data.accessToken
                    }));
                } catch (e) {
                    console.error(e)
                }
            },
        }),
        logout: build.mutation({
            queryFn: async (arg, {dispatch}, extraOptions, baseQuery) => {
                const result = await baseQuery({
                    url: "/auth/logout",
                    method: "POST"
                });
                dispatch(logoutUser())
                dispatch(apiSlice.util.resetApiState());
                return result;
            }
        }),
    })
});
export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation
} = authApi;