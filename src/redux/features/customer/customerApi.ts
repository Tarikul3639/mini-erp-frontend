import { baseApi } from "@/redux/baseApi";

import type {
    Customer,
    CustomerListResponse,
} from "@/types/customer";

export const customerApi =
    baseApi.injectEndpoints({
        endpoints: (
            builder
        ) => ({
            getCustomers:
                builder.query<
                    CustomerListResponse,
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
                        url: "/customers",
                        params: {
                            page,
                            limit,
                            search,
                        },
                    }),

                    providesTags: [
                        "CUSTOMER",
                    ],
                }),

            getCustomer:
                builder.query<
                    Customer,
                    string
                >({
                    query: (
                        id
                    ) =>
                        `/customers/${id}`,

                    providesTags: [
                        "CUSTOMER",
                    ],
                }),

            createCustomer:
                builder.mutation({
                    query: (
                        body
                    ) => ({
                        url: "/customers",

                        method: "POST",

                        body,
                    }),

                    invalidatesTags: [
                        "CUSTOMER",
                        "DASHBOARD",
                    ],
                }),

            updateCustomer:
                builder.mutation({
                    query: ({
                        id,
                        body,
                    }) => ({
                        url: `/customers/${id}`,

                        method:
                            "PATCH",

                        body,
                    }),

                    invalidatesTags: [
                        "CUSTOMER",
                        "DASHBOARD",
                    ],
                }),

            deleteCustomer:
                builder.mutation({
                    query: (
                        id
                    ) => ({
                        url: `/customers/${id}`,

                        method:
                            "DELETE",
                    }),

                    invalidatesTags: [
                        "CUSTOMER",
                        "DASHBOARD",
                    ],
                }),
        }),
    });

export const {
    useGetCustomersQuery,
    useGetCustomerQuery,
    useCreateCustomerMutation,
    useUpdateCustomerMutation,
    useDeleteCustomerMutation,
} = customerApi;