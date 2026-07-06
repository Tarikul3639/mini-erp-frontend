import { Package, ShoppingCart, Users, TriangleAlert } from "lucide-react"

import PageHeader from "@/components/common/page-header"
import PageLoader from "@/components/common/page-loader"
import EmptyState from "@/components/common/empty-state"
import StatCard from "@/components/common/stat-card"

import QuickActions from "@/components/dashboard/quick-actions"
import RevenueCard from "@/components/dashboard/revenue-card"
import RevenueChart from "@/components/dashboard/revenue-chart"
import LowStockTable from "@/components/dashboard/low-stock-table"
import RecentSales from "@/components/dashboard/recent-sales"
import TopSellingProducts from "@/components/dashboard/top-selling-products"

import { useGetDashboardQuery } from "@/redux/features/dashboard/dashboardApi"

export default function DashboardPage() {
    const { data, isLoading } = useGetDashboardQuery()

    if (isLoading) {
        return <PageLoader />
    }

    const dashboard = data?.data

    return (
        <div className="space-y-8">
            <PageHeader
                title="Dashboard"
                description="Overview of your inventory and sales."
            />

            {/* Statistics */}
            <div className="grid gap-6 grid-cols-2 xl:grid-cols-5">
                <StatCard
                    title="Products"
                    value={dashboard?.totalProducts ?? 0}
                    icon={Package}
                />

                <StatCard
                    title="Customers"
                    value={dashboard?.totalCustomers ?? 0}
                    icon={Users}
                />

                <StatCard
                    title="Sales"
                    value={dashboard?.totalSales ?? 0}
                    icon={ShoppingCart}
                />

                <StatCard
                    title="Low Stock"
                    value={dashboard?.lowStockProducts?.length ?? 0}
                    icon={TriangleAlert}
                />

                <RevenueCard revenue={dashboard?.totalRevenue ?? 0} />
            </div>

            {/* Quick Actions */}
            <QuickActions />

            {/* Revenue Chart */}
            {dashboard?.monthlySales?.length ? (
                <RevenueChart data={dashboard.monthlySales} />
            ) : (
                <EmptyState
                    title="No Revenue Data"
                    description="Monthly revenue chart will appear after sales are recorded."
                    icon={ShoppingCart}
                />
            )}

            {/* Low Stock + Recent Sales */}
            <div className="grid gap-6 xl:grid-cols-2">
                {dashboard?.lowStockProducts?.length ? (
                    <LowStockTable products={dashboard.lowStockProducts} />
                ) : (
                    <EmptyState
                        title="No Low Stock Products"
                        description="All products currently have sufficient stock."
                        icon={Package}
                    />
                )}

                {dashboard?.recentSales?.length ? (
                    <RecentSales sales={dashboard.recentSales} />
                ) : (
                    <EmptyState
                        title="No Recent Sales"
                        description="Recent sales will appear here once you create a sale."
                        icon={ShoppingCart}
                    />
                )}
            </div>

            {/* Top Selling Products */}
            {dashboard?.topSellingProducts?.length ? (
                <TopSellingProducts products={dashboard.topSellingProducts} />
            ) : (
                <EmptyState
                    title="No Top Selling Products"
                    description="Top selling products will appear after sufficient sales."
                    icon={Package}
                />
            )}
        </div>
    )
}
