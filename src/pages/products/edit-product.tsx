import PageHeader from "@/components/common/page-header";

import EditProductForm from "@/components/product/edit-product-form";

export default function EditProductPage() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Edit Product"
                description="Update product information."
            />

            <EditProductForm />
        </div>
    );
}