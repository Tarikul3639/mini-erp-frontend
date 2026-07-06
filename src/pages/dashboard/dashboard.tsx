import {
    Package,
    ShoppingCart,
    Users,
    TriangleAlert,
} from "lucide-react";

import PageHeader from "@/components/common/page-header";
import StatCard from "@/components/common/stat-card";
import EmptyState from "@/components/common/empty-state";
import { useGetDashboardQuery } from "@/redux/features/dashboard/dashboardApi";
import PageLoader from "@/components/common/page-loader";

export default function DashboardPage() {
    const {
        data,
        isLoading,
    } = useGetDashboardQuery();


    if (isLoading) {
        return <PageLoader />;
    }
    return (
        <div className="space-y-8">
            <PageHeader
                title="Dashboard"
                description="Overview of your inventory and sales."
            />

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    title="Products"
                    value={data?.data.totalProducts ?? 0}
                    icon={Package}
                />

                <StatCard
                    title="Customers"
                    value={data?.data.totalCustomers ?? 0}
                    icon={Users}
                />

                <StatCard
                    title="Sales"
                    value={data?.data.totalSales ?? 0}
                    icon={ShoppingCart}
                />

                <StatCard
                    title="Low Stock"
                    value={data?.data.lowStockProducts.length ?? 0}
                    icon={TriangleAlert}
                />
            </div>

            {data?.data.lowStockProducts.length === 0 && (
                <EmptyState
                    title="No low stock products"
                    description="Everything looks good. Products with stock below five will appear here."
                    icon={Package}
                />
            )}
        </div>
    );
}