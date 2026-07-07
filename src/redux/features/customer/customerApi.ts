import { baseApi } from "@/redux/baseApi"

import type {
  CustomerListResponse,
  CustomerResponse,
} from "@/types/customer"

export const customerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query<
      CustomerListResponse,
      {
        page?: number
        limit?: number
        search?: string
      }
    >({
      query: ({ page = 1, limit = 10, search = "" }) => ({
        url: "/customers",
        params: {
          page,
          limit,
          search,
        },
      }),

      providesTags: ["CUSTOMER"],
    }),

    // Get Single Customer
    getCustomer: builder.query<CustomerResponse, string>({
      query: (id) => ({
        url: `/customers/${id}`,
      }),

      providesTags: ["CUSTOMER"],
    }),

    createCustomer: builder.mutation({
      query: (body) => ({
        url: "/customers",
        method: "POST",
        body,
      }),

      invalidatesTags: ["CUSTOMER", "DASHBOARD"],
    }),

    updateCustomer: builder.mutation({
      query: ({ id, body }) => ({
        url: `/customers/${id}`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: ["CUSTOMER", "DASHBOARD"],
    }),

    deleteCustomer: builder.mutation({
      query: (id) => ({
        url: `/customers/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["CUSTOMER", "DASHBOARD"],
    }),
  }),
})

export const {
  useGetCustomersQuery,
  useGetCustomerQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = customerApi
