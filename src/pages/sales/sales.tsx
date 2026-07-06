import { useState } from "react";
import { useDebounce } from "use-debounce";
import PageHeader from "@/components/common/page-header";
import SaleTable from "@/components/sale/sale-table";
import PageToolbar from "@/components/common/page-toolbar";
import { useNavigate } from "react-router-dom";

export default function SalesPage() {
    const navigate = useNavigate();

    const [search, setSearch] =
        useState("");

    const [page, setPage] =
        useState(1);

    const [debouncedSearch] =
        useDebounce(search, 500);

    return (
        <div className="space-y-6">
            <PageHeader
                title="Sales"
                description="Manage sales history."
            />

            <PageToolbar
                search={search}
                onSearchChange={setSearch}
                onCreate={() =>
                    navigate("/sales/create")
                }
                searchPlaceholder="Search sales..."
                buttonText="Create Sale"
            />

            <SaleTable
                page={page}
                search={
                    debouncedSearch
                }
                onPageChange={
                    setPage
                }
            />
        </div>
    );
}