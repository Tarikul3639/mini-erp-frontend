import { useParams } from "react-router-dom"

import { ReceiptText } from "lucide-react"

import { useGetSaleQuery } from "@/redux/features/sale/saleApi"

import PageHeader from "@/components/common/page-header"
import PageLoader from "@/components/common/page-loader"
import EmptyState from "@/components/common/empty-state"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function SaleDetailsPage() {
    const navigate = useNavigate()
    const { id } = useParams()

    const { data, isLoading } = useGetSaleQuery(id!)

    if (isLoading) {
        return <PageLoader />
    }

    const sale = data?.data

    if (!sale) {
        return (
            <EmptyState
                title="Sale not found"
                description="The requested sale does not exist."
                icon={ReceiptText}
            />
        )
    }

    return (
        <div className="space-y-6">
            <PageHeader
                title="Sale Details"
                description="View sale information."
                action={
                    <Button
                        variant="outline"
                        onClick={() =>
                            navigate(-1)
                        }
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </Button>
                }
            />

            <Card>
                <CardContent className="space-y-8 p-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <h4 className="text-sm text-muted-foreground">Customer</h4>

                            <p className="font-medium">{sale.customer.name}</p>

                            <p className="text-sm text-muted-foreground">
                                {sale.customer.phone}
                            </p>
                        </div>

                        <div>
                            <h4 className="text-sm text-muted-foreground">Sold At</h4>

                            <p className="font-medium">
                                {new Date(sale.createdAt).toLocaleString()}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Products</h3>

                        {sale.products.map((item) => (
                            <div
                                key={item._id}
                                className="flex items-center gap-4 rounded-lg border p-4"
                            >
                                <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                    className="h-16 w-16 rounded-md border object-cover"
                                />

                                <div className="flex-1">
                                    <h4 className="font-medium">{item.product.name}</h4>

                                    <p className="text-sm text-muted-foreground">
                                        SKU: {item.product.sku}
                                    </p>
                                </div>

                                <div className="space-y-1 text-right">
                                    <p>Qty: {item.quantity}</p>

                                    <p>Unit: ৳{item.unitPrice.toLocaleString()}</p>

                                    <p className="font-semibold">
                                        Total: ৳{item.totalPrice.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end border-t pt-6">
                        <div className="text-right">
                            <p className="text-sm text-muted-foreground">Grand Total</p>

                            <p className="text-3xl font-bold text-primary">
                                ৳{sale.grandTotal.toLocaleString()}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
