import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface Props {
    sales: {
        _id: string

        customer: {
            _id: string
            name: string
        }

        products: {
            product: {
                _id: string
                name: string
                image: string
            }

            quantity: number
            unitPrice: number
            totalPrice: number
        }[]

        grandTotal: number
        createdAt: string
    }[]
}

export default function RecentSales({ sales }: Props) {
    if (!sales.length) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Recent Sales</CardTitle>
                </CardHeader>

                <CardContent className="py-10 text-center text-sm text-muted-foreground">
                    No recent sales found.
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="gap-2">
            <CardHeader className="px-4">
                <CardTitle className="text-sm font-semibold">
                    Recent Sales
                </CardTitle>
            </CardHeader>

            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow className="h-10">
                            <TableHead>Customer</TableHead>
                            <TableHead>Products</TableHead>
                            <TableHead className="w-16 text-center">Qty</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                            <TableHead className="w-24 text-right">Date</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {sales.map((sale) => (
                            <TableRow key={sale._id}>
                                <TableCell className="py-2 font-medium">
                                    {sale.customer.name}
                                </TableCell>

                                <TableCell className="py-2">
                                    <div className="space-y-1">
                                        {sale.products.map((item) => (
                                            <div
                                                key={item.product._id}
                                                className="flex items-center gap-2"
                                            >
                                                <img
                                                    src={item.product.image}
                                                    alt={item.product.name}
                                                    className="h-6 w-6 rounded object-cover border"
                                                />

                                                <span className="truncate text-xs font-medium">
                                                    {item.product.name}
                                                </span>

                                                <span className="text-xs text-muted-foreground">
                                                    ×{item.quantity}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </TableCell>

                                <TableCell className="py-2 text-center">
                                    {sale.products.reduce(
                                        (sum, item) => sum + item.quantity,
                                        0
                                    )}
                                </TableCell>

                                <TableCell className="py-2 text-right font-semibold">
                                    ৳{sale.grandTotal.toLocaleString()}
                                </TableCell>

                                <TableCell className="py-2 text-right text-muted-foreground">
                                    {new Date(sale.createdAt).toLocaleDateString("en-GB")}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
