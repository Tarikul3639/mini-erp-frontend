import {
    Package,
    ShoppingCart,
    Users,
    TriangleAlert,
} from "lucide-react";

import PageHeader from "@/components/common/page-header";
import StatCard from "@/components/common/stat-card";
import EmptyState from "@/components/common/empty-state";

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <PageHeader
                title="Dashboard"
                description="Overview of your inventory and sales."
            />

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    title="Products"
                    value={0}
                    icon={Package}
                />

                <StatCard
                    title="Customers"
                    value={0}
                    icon={Users}
                />

                <StatCard
                    title="Sales"
                    value={0}
                    icon={ShoppingCart}
                />

                <StatCard
                    title="Low Stock"
                    value={0}
                    icon={TriangleAlert}
                />
            </div>

            <EmptyState
                title="No low stock products"
                description="Everything looks good. Products with stock below five will appear here."
                icon={Package}
            />
        </div>
    );
}