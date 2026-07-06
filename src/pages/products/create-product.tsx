import PageHeader from "@/components/common/page-header";
import CreateProductForm from "@/components/product/create-product-form";

export default function CreateProductPage() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Create Product"
                description="Add a new product."
            />

            <CreateProductForm />
        </div>
    );
}