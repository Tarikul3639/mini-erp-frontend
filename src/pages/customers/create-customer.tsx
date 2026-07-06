import PageHeader from "@/components/common/page-header";

import CreateCustomerForm from "@/components/customer/create-customer-form";

export default function CreateCustomerPage() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Create Customer"
                description="Add a new customer."
            />

            <CreateCustomerForm />
        </div>
    );
}