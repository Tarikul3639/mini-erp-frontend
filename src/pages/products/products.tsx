import { useState } from "react"

import PageHeader from "@/components/common/page-header"

import ProductToolbar from "@/components/product/product-toolbar"
import ProductTable from "@/components/product/product-table"
import { useDebounce } from "use-debounce"

export default function ProductsPage() {
    const [search, setSearch] = useState("")

    const [debouncedSearch] = useDebounce(search, 500)

    const [page, setPage] = useState(1)

    return (
        <div className="space-y-6">
            <PageHeader title="Products" description="Manage all products." />

            <ProductToolbar
                search={search}
                onSearchChange={(value) => {
                    setSearch(value)

                    setPage(1)
                }}
            />

            <ProductTable
                page={page}
                search={debouncedSearch}
                onPageChange={setPage}
            />
        </div>
    )
}
