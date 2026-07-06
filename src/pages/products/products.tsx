import { useState } from "react";

import { useDebounce } from "use-debounce";
import { useNavigate } from "react-router-dom";

import PageHeader from "@/components/common/page-header";
import PageToolbar from "@/components/common/page-toolbar";
import ProductTable from "@/components/product/product-table";

import { useRole } from "@/hooks/useRole";

export default function ProductsPage() {
    const navigate = useNavigate();

    const { isAdmin, isManager } = useRole();

    const [search, setSearch] = useState("");

    const [debouncedSearch] = useDebounce(search, 500);

    const [page, setPage] = useState(1);

    return (
        <div className="space-y-6">
            <PageHeader
                title="Products"
                description="Manage all products."
            />

            <PageToolbar
                search={search}
                onSearchChange={setSearch}
                searchPlaceholder="Search products..."
                buttonText="Add Product"
                onCreate={
                    isAdmin || isManager
                        ? () =>
                              navigate(
                                  "/products/create"
                              )
                        : undefined
                }
            />

            <ProductTable
                page={page}
                search={debouncedSearch}
                onPageChange={setPage}
            />
        </div>
    );
}