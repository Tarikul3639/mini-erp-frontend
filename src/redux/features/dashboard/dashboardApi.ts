import { baseApi } from "@/redux/baseApi"

export interface DashboardResponse {
    success: boolean
    message: string
    data: {
        totalProducts: number
        totalCustomers: number
        totalSales: number
        totalRevenue: number

        lowStockProducts: {
            _id: string
            name: string
            sku: string
            stockQuantity: number
            sellingPrice: number
            image: string
        }[]

        recentSales: {
            _id: string

            customer: {
                _id: string
                name: string
            }

            products: {
                product: {
                    _id: string
                    name: string
                    image: string
                }

                quantity: number
                unitPrice: number
                totalPrice: number
            }[]

            grandTotal: number

            createdAt: string
        }[]

        monthlySales: {
            _id: number
            revenue: number
        }[]

        topSellingProducts: {
            _id: string

            quantity: number

            product: {
                _id: string
                name: string
                sku: string
                image: string
                sellingPrice: number
            }
        }[]
    }
}

export const dashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDashboard: builder.query<DashboardResponse, void>({
            query: () => ({
                url: "/dashboard",
            }),

            providesTags: ["DASHBOARD"],
        }),
    }),
})

export const { useGetDashboardQuery } = dashboardApi
