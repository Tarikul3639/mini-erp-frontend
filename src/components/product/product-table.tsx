import { Package } from "lucide-react"

import { useRole } from "@/hooks/useRole"

import { useGetProductsQuery } from "@/redux/features/product/productApi"

import PageLoader from "@/components/common/page-loader"
import EmptyState from "@/components/common/empty-state"
import Pagination from "@/components/common/pagination"

import ProductActions from "./product-actions"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface Props {
    page: number
    search: string
    onPageChange: (page: number) => void
}

export default function ProductTable({ page, search, onPageChange }: Props) {
    const { isAdmin, isManager } = useRole()

    const canManage = isAdmin || isManager

    const { data, isLoading } = useGetProductsQuery({
        page,
        limit: 10,
        search,
    })

    if (isLoading) {
        return <PageLoader />
    }

    if (!data || data.data.length === 0) {
        return (
            <EmptyState
                title="No products found"
                description={
                    canManage
                        ? "Create your first product."
                        : "No products are available."
                }
                icon={Package}
            />
        )
    }

    return (
        <div className="overflow-hidden rounded-lg border bg-card">
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product</TableHead>

                            <TableHead>SKU</TableHead>

                            <TableHead>Category</TableHead>

                            <TableHead className="text-right">Stock</TableHead>

                            <TableHead className="text-right">Purchase</TableHead>

                            <TableHead className="text-right">Selling</TableHead>

                            {canManage && (
                                <TableHead className="text-center">Actions</TableHead>
                            )}
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {data.data.map((product) => (
                            <TableRow key={product._id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="h-12 w-12 rounded-md border object-cover"
                                        />

                                        <div>
                                            <p className="font-medium">{product.name}</p>

                                            <p className="text-xs text-muted-foreground">
                                                SKU: {product.sku}
                                            </p>
                                        </div>
                                    </div>
                                </TableCell>

                                <TableCell>{product.sku}</TableCell>

                                <TableCell>
                                    <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium">
                                        {product.category}
                                    </span>
                                </TableCell>

                                <TableCell className="text-right">
                                    <span
                                        className={
                                            product.stockQuantity < 5
                                                ? "font-semibold text-destructive"
                                                : ""
                                        }
                                    >
                                        {product.stockQuantity}
                                    </span>
                                </TableCell>

                                <TableCell className="text-right">
                                    ৳{product.purchasePrice.toLocaleString()}
                                </TableCell>

                                <TableCell className="text-right font-medium">
                                    ৳{product.sellingPrice.toLocaleString()}
                                </TableCell>

                                {canManage && (
                                    <TableCell className="text-center">
                                        <ProductActions productId={product._id} />
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="border-t p-4">
                <Pagination
                    page={page}
                    totalPage={data.meta.totalPage}
                    onPageChange={onPageChange}
                />
            </div>
        </div>
    )
}
