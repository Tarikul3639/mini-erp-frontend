import {
    type BaseQueryFn,
    type FetchArgs,
    type FetchBaseQueryError,
    fetchBaseQuery,
    createApi,
} from "@reduxjs/toolkit/query/react"

import { tagTypes } from "./tagTypes"

const rawBaseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,

    prepareHeaders: (headers) => {
        const token = localStorage.getItem("accessToken")

        if (token) {
            headers.set("Authorization", `Bearer ${token}`)
        }

        return headers
    },
})

const baseQuery: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    return rawBaseQuery(args, api, extraOptions)
}

export const baseApi = createApi({
    reducerPath: "baseApi",

    baseQuery,

    tagTypes,

    endpoints: () => ({}),
})
