import { useMemo } from "react"
import { useNavigate } from "react-router-dom"

import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Plus } from "lucide-react"
import { toast } from "sonner"

import { saleSchema, type SaleFormValues } from "@/lib/validations/sale.schema"

import { useCreateSaleMutation } from "@/redux/features/sale/saleApi"
import { useGetProductsQuery } from "@/redux/features/product/productApi"

import CustomerSelect from "./customer-select"
import SaleItem from "./sale-item"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function SaleForm() {
    const navigate = useNavigate()

    const [createSale, { isLoading }] = useCreateSaleMutation()

    const { data: productsData } = useGetProductsQuery({
        page: 1,
        limit: 1000,
    })

    const {
        control,
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<SaleFormValues>({
        resolver: zodResolver(saleSchema),

        defaultValues: {
            customer: "",
            products: [
                {
                    product: "",
                    quantity: 1,
                },
            ],
        },
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: "products",
    })

    const watchedProducts = watch("products")

    const grandTotal = useMemo(() => {
        if (!productsData) return 0

        return watchedProducts.reduce((total, item) => {
            const product = productsData.data.find((p) => p._id === item.product)

            if (!product) return total

            return total + product.sellingPrice * item.quantity
        }, 0)
    }, [watchedProducts, productsData])

    const onSubmit = async (values: SaleFormValues) => {
        try {
            await createSale(values).unwrap()

            toast.success("Sale created successfully.")

            navigate("/sales")
        } catch (error: any) {
            toast.error(error?.data?.message ?? "Failed to create sale.")
        }
    }

    return (
        <Card>
            <CardContent className="space-y-6 p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <CustomerSelect control={control} />

                    <div className="space-y-4">
                        {fields.map((field, index) => (
                            <SaleItem
                                key={field.id}
                                index={index}
                                control={control}
                                register={register}
                                errors={errors}
                                remove={remove}
                                canRemove={fields.length > 1}
                            />
                        ))}

                        <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                                append({
                                    product: "",
                                    quantity: 1,
                                })
                            }
                        >
                            <Plus className="mr-2 size-4" />
                            Add Product
                        </Button>
                    </div>

                    <div className="rounded-lg border bg-muted/40 p-5">
                        <div className="flex items-center justify-between">
                            <span className="font-medium">Grand Total</span>

                            <span className="text-2xl font-bold text-primary">
                                ৳{grandTotal.toLocaleString()}
                            </span>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => navigate("/sales")}
                        >
                            Cancel
                        </Button>

                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Creating..." : "Create Sale"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
