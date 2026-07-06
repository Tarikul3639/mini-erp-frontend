import { useState } from "react"

import PageHeader from "@/components/common/page-header"
import ProductTable from "@/components/product/product-table"
import PageToolbar from "@/components/common/page-toolbar"
import { useDebounce } from "use-debounce"
import { useNavigate } from "react-router-dom"

export default function ProductsPage() {
    const navigate = useNavigate();
    
    const [search, setSearch] = useState("")

    const [debouncedSearch] = useDebounce(search, 500)

    const [page, setPage] = useState(1)

    return (
        <div className="space-y-6">
            <PageHeader title="Products" description="Manage all products." />

            <PageToolbar
                search={search}
                onSearchChange={setSearch}
                onCreate={() =>
                    navigate("/products/create")
                }
                searchPlaceholder="Search products..."
                buttonText="Add Product"
            />

            <ProductTable
                page={page}
                search={debouncedSearch}
                onPageChange={setPage}
            />
        </div>
    )
}
