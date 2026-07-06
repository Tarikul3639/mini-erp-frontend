import { baseApi } from "@/redux/baseApi";

import type {
    LoginPayload,
    LoginResponse,
} from "@/types/auth";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<
            LoginResponse,
            LoginPayload
        >({
            query: (body) => ({
                url: "/auth/login",
                method: "POST",
                body,
            }),
        }),

        me: builder.query({
            query: () => ({
                url: "/auth/me",
            }),

            providesTags: ["AUTH"],
        }),
    }),
});

export const {
    useLoginMutation,
    useMeQuery,
} = authApi;