import { baseApi } from "@/redux/baseApi";

import type {
    Product,
    ProductResponse,
    ProductListResponse,
} from "@/types/product";

export const productApi =
    baseApi.injectEndpoints({
        endpoints: (builder) => ({
            getProducts: builder.query<
                ProductListResponse,
                {
                    page?: number;
                    limit?: number;
                    search?: string;
                }
            >({
                query: ({
                    page = 1,
                    limit = 10,
                    search = "",
                }) => ({
                    url: "/products",
                    params: {
                        page,
                        limit,
                        search,
                    },
                }),

                providesTags: ["PRODUCT"],
            }),

            createProduct:
                builder.mutation({
                    query: (
                        body: FormData
                    ) => ({
                        url: "/products",
                        method: "POST",
                        body,
                    }),

                    invalidatesTags: [
                        "PRODUCT",
                        "DASHBOARD",
                    ],
                }),

            updateProduct: builder.mutation<
                Product,
                {
                    id: string;
                    body: FormData;
                }
            >({
                query: ({ id, body }) => ({
                    url: `/products/${id}`,
                    method: "PATCH",
                    body,
                }),

                invalidatesTags: [
                    "PRODUCT",
                    "DASHBOARD",
                ],
            }),

            deleteProduct: builder.mutation<
                void,
                string
            >({
                query: (id) => ({
                    url: `/products/${id}`,
                    method: "DELETE",
                }),

                invalidatesTags: [
                    "PRODUCT",
                    "DASHBOARD",
                ],
            }),

            // Get a single product by ID
            getProduct: builder.query<ProductResponse, string>({
                query: (id) => ({
                    url: `/products/${id}`,
                }),

                providesTags: ["PRODUCT"],
            }),
        }),

    });

export const {
    useGetProductsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,

    useGetProductQuery,
} = productApi;