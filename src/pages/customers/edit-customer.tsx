import PageHeader from "@/components/common/page-header";

import EditCustomerForm from "@/components/customer/edit-customer-form";

export default function EditCustomerPage() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Edit Customer"
                description="Update customer information."
            />

            <EditCustomerForm />
        </div>
    );
}