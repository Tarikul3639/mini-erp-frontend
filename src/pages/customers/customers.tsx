import { useState } from "react";

import { useDebounce } from "use-debounce";
import { useNavigate } from "react-router-dom";

import PageHeader from "@/components/common/page-header";
import PageToolbar from "@/components/common/page-toolbar";
import CustomerTable from "@/components/customer/customer-table";

import { useRole } from "@/hooks/useRole";

export default function CustomersPage() {
    const navigate = useNavigate();

    const { isAdmin, isManager } = useRole();
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [debouncedSearch] = useDebounce(search, 500);

    return (
        <div className="space-y-6">
            <PageHeader
                title="Customers"
                description="Manage all customers."
            />

            <PageToolbar
                search={search}
                onSearchChange={setSearch}
                searchPlaceholder="Search customers..."
                buttonText="Add Customer"
                onCreate={
                    isAdmin || isManager
                        ? () =>
                              navigate(
                                  "/customers/create"
                              )
                        : undefined
                }
            />

            <CustomerTable
                page={page}
                search={debouncedSearch}
                onPageChange={setPage}
            />
        </div>
    );
}