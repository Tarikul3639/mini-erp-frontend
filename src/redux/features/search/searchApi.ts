import { baseApi } from "@/redux/baseApi"

import type { GlobalSearchResponse } from "@/types/search"

export const searchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    globalSearch: builder.query<GlobalSearchResponse, string>({
      query: (q) => ({
        url: "/search",
        params: {
          q,
        },
      }),

      keepUnusedDataFor: 30,
    }),
  }),
})

export const { useGlobalSearchQuery } = searchApi
