import { ShoppingCart } from "lucide-react"

import { useGetSalesQuery } from "@/redux/features/sale/saleApi"

import EmptyState from "@/components/common/empty-state"
import PageLoader from "@/components/common/page-loader"
import Pagination from "@/components/common/pagination"

import SaleActions from "./sale-actions"

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

export default function SaleTable({ page, search, onPageChange }: Props) {
    const { data, isLoading } = useGetSalesQuery({
        page,
        limit: 10,
        search,
    })

    if (isLoading) {
        return <PageLoader />
    }

    if (!data?.data.length) {
        return (
            <EmptyState
                title="No sales found"
                description="Create your first sale."
                icon={ShoppingCart}
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

                            <TableHead>Customer</TableHead>

                            <TableHead>Qty</TableHead>

                            <TableHead className="text-right">Unit</TableHead>

                            <TableHead className="text-right">Total</TableHead>

                            <TableHead>Date</TableHead>

                            <TableHead className="text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {data.data.map((sale) => {
                            const firstProduct =
                                sale.products[0];

                            return (
                                <TableRow key={sale._id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={
                                                    firstProduct.product.image
                                                }
                                                alt={
                                                    firstProduct.product.name
                                                }
                                                className="h-10 w-10 rounded-md border object-cover"
                                            />

                                            <div>
                                                <p className="font-medium">
                                                    {
                                                        firstProduct
                                                            .product
                                                            .name
                                                    }
                                                </p>

                                                <p className="text-muted-foreground text-xs">
                                                    {
                                                        firstProduct
                                                            .product
                                                            .sku
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        {sale.customer.name}
                                    </TableCell>

                                    <TableCell>
                                        {firstProduct.quantity}
                                    </TableCell>

                                    <TableCell className="text-right">
                                        ৳
                                        {firstProduct.unitPrice.toLocaleString()}
                                    </TableCell>

                                    <TableCell className="text-right font-medium">
                                        ৳
                                        {sale.grandTotal.toLocaleString()}
                                    </TableCell>

                                    <TableCell>
                                        {new Date(
                                            sale.createdAt
                                        ).toLocaleDateString()}
                                    </TableCell>

                                    <TableCell className="text-center">
                                        <SaleActions
                                            saleId={sale._id}
                                        />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
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
