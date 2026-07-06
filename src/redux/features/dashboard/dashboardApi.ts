import { baseApi } from "@/redux/baseApi";

export interface DashboardResponse {
    success: boolean;
    message: string;
    data: {
        totalProducts: number;
        totalCustomers: number;
        totalSales: number;
        lowStockProducts: {
            _id: string;
            name: string;
            sku: string;
            stockQuantity: number;
            image: string;
        }[];
    };
}

export const dashboardApi =
    baseApi.injectEndpoints({
        endpoints: (builder) => ({
            getDashboard:
                builder.query<
                    DashboardResponse,
                    void
                >({
                    query: () => ({
                        url: "/dashboard",
                    }),

                    providesTags: [
                        "DASHBOARD",
                    ],
                }),
        }),
    });

export const {
    useGetDashboardQuery,
} = dashboardApi;