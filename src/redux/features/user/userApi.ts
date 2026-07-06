import { baseApi } from "@/redux/baseApi"

import type { UserResponse, UpdateProfilePayload } from "@/types/user"

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query<UserResponse, void>({
            query: () => ({
                url: "/users/profile",
            }),

            providesTags: ["AUTH"],
        }),

        updateProfile: builder.mutation<
            UserResponse,
            UpdateProfilePayload | FormData
        >({
            query: (body) => ({
                url: "/users/profile",
                method: "PATCH",
                body,
            }),

            invalidatesTags: ["AUTH"],
        }),

        // Update password
        updatePassword: builder.mutation<
            { success: boolean; message: string },
            { currentPassword: string; newPassword: string }
        >({
            query: (body) => ({
                url: "/users/password",
                method: "PATCH",
                body,
            }),
        }),
    }),
})

export const { useGetProfileQuery, useUpdateProfileMutation } = userApi
