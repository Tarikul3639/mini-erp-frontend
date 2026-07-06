import { baseApi } from "@/redux/baseApi"

import type { CreateSalePayload, Sale, SaleListResponse } from "@/types/sale"

interface SaleResponse {
    success: boolean
    message: string
    data: Sale
}

export const saleApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSales: builder.query<
            SaleListResponse,
            {
                page?: number
                limit?: number
                search?: string
            }
        >({
            query: ({ page = 1, limit = 10, search = "" }) => ({
                url: "/sales",
                params: {
                    page,
                    limit,
                    search,
                },
            }),

            providesTags: ["SALE"],
        }),

        getSale: builder.query<SaleResponse, string>({
            query: (id) => ({
                url: `/sales/${id}`,
            }),

            providesTags: (_result, _error, id) => [
                "SALE",
                {
                    type: "SALE",
                    id,
                },
            ],
        }),

        createSale: builder.mutation<SaleResponse, CreateSalePayload>({
            query: (body) => ({
                url: "/sales",
                method: "POST",
                body,
            }),

            invalidatesTags: ["SALE", "PRODUCT", "DASHBOARD"],
        }),

        deleteSale: builder.mutation<
            {
                success: boolean
                message: string
            },
            string
        >({
            query: (id) => ({
                url: `/sales/${id}`,
                method: "DELETE",
            }),

            invalidatesTags: ["SALE", "PRODUCT", "DASHBOARD"],
        }),
    }),
})

export const {
    useGetSalesQuery,
    useGetSaleQuery,
    useCreateSaleMutation,
    useDeleteSaleMutation,
} = saleApi
