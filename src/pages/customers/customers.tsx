import { useState } from "react";

import {
    useDebounce,
} from "use-debounce";

import PageHeader from "@/components/common/page-header";
import CustomerTable from "@/components/customer/customer-table";
import ProductToolbar from "@/components/product/product-toolbar";

export default function CustomersPage() {
    const [search, setSearch] =
        useState("");

    const [page, setPage] =
        useState(1);

    const [debouncedSearch] =
        useDebounce(search, 500);

    return (
        <div className="space-y-6">
            <PageHeader
                title="Customers"
                description="Manage all customers."
            />

            <ProductToolbar
                search={search}
                onSearchChange={(
                    value
                ) => {
                    setSearch(
                        value
                    );

                    setPage(1);
                }}
            />

            <CustomerTable
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