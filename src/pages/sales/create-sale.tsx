import PageHeader from "@/components/common/page-header";

import SaleForm from "@/components/sale/sale-form";

export default function CreateSalePage() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Create Sale"
                description="Record a new sale."
            />

            <SaleForm />
        </div>
    );
}