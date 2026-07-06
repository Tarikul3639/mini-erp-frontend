import type { SearchCustomer, SearchProduct, SearchSale } from "@/types/search"

import SearchItem from "./search-item"

interface Props {
    products: SearchProduct[]
    customers: SearchCustomer[]
    sales: SearchSale[]
}

export default function SearchResults({ products, customers, sales }: Props) {
    const hasResult = products.length || customers.length || sales.length

    if (!hasResult) {
        return (
            <div className="p-4 text-center text-sm text-muted-foreground">
                No results found
            </div>
        )
    }

    return (
        <div className="max-h-105 overflow-y-auto py-2">
            {!!products.length && (
                <>
                    <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase">
                        Products
                    </div>

                    {products.map((item) => (
                        <SearchItem key={item._id} type="product" item={item} />
                    ))}
                </>
            )}

            {!!customers.length && (
                <>
                    <div className="mt-2 px-3 py-2 text-xs font-semibold text-muted-foreground uppercase">
                        Customers
                    </div>

                    {customers.map((item) => (
                        <SearchItem key={item._id} type="customer" item={item} />
                    ))}
                </>
            )}

            {!!sales.length && (
                <>
                    <div className="mt-2 px-3 py-2 text-xs font-semibold text-muted-foreground uppercase">
                        Sales
                    </div>

                    {sales.map((item) => (
                        <SearchItem key={item._id} type="sale" item={item} />
                    ))}
                </>
            )}
        </div>
    )
}
