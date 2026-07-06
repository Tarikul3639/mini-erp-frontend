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

        changePassword: builder.mutation<
            {
                success: boolean;
                message: string;
            },
            {
                currentPassword: string;
                newPassword: string;
            }
        >({
            query: (body) => ({
                url: "/auth/change-password",
                method: "PATCH",
                body,
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useChangePasswordMutation,
} = authApi;