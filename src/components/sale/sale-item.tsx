import {
    type Control,
    Controller,
    type FieldErrors,
    type UseFormRegister,
    useWatch,
} from "react-hook-form"

import { Trash2 } from "lucide-react"

import type { SaleFormValues } from "@/lib/validations/sale.schema"

import { useGetProductsQuery } from "@/redux/features/product/productApi"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface Props {
    index: number

    control: Control<SaleFormValues>

    register: UseFormRegister<SaleFormValues>

    errors: FieldErrors<SaleFormValues>

    remove: (index: number) => void

    canRemove: boolean
}

export default function SaleItem({
    index,
    control,
    register,
    errors,
    remove,
    canRemove,
}: Props) {
    const { data } = useGetProductsQuery({
        page: 1,
        limit: 1000,
    })

    const selectedProductId = useWatch({
        control,
        name: `products.${index}.product`,
    })

    const quantity =
        useWatch({
            control,
            name: `products.${index}.quantity`,
        }) ?? 0

    const product = data?.data.find((item) => item._id === selectedProductId)

    const total = (product?.sellingPrice ?? 0) * quantity

    return (
        <div className="rounded-lg border p-5">
            <div className="grid gap-5 lg:grid-cols-[1.8fr_140px_160px_160px_60px]">
                <div className="space-y-2">
                    <Label>Product</Label>

                    <Controller
                        control={control}
                        name={`products.${index}.product`}
                        render={({ field }) => (
                            <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Product" />
                                </SelectTrigger>

                                <SelectContent>
                                    {data?.data.map((product) => (
                                        <SelectItem key={product._id} value={product._id}>
                                            {product.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />

                    <p className="text-xs text-destructive">
                        {errors.products?.[index]?.product?.message}
                    </p>
                </div>

                <div className="space-y-2">
                    <Label>Quantity</Label>

                    <Input
                        type="number"
                        min={1}
                        {...register(`products.${index}.quantity`, {
                            valueAsNumber: true,
                        })}
                    />

                    <p className="text-xs text-destructive">
                        {errors.products?.[index]?.quantity?.message}
                    </p>
                </div>

                <div className="space-y-2">
                    <Label>Unit Price</Label>

                    <div className="flex h-10 items-center rounded-md border bg-muted px-3 text-sm">
                        ৳{(product?.sellingPrice ?? 0).toLocaleString()}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Total</Label>

                    <div className="flex h-10 items-center rounded-md border bg-primary/10 px-3 font-semibold text-primary">
                        ৳{total.toLocaleString()}
                    </div>
                </div>

                <div className="flex items-end">
                    {canRemove && (
                        <Button
                            type="button"
                            size="icon"
                            variant="destructive"
                            onClick={() => remove(index)}
                        >
                            <Trash2 className="size-4" />
                        </Button>
                    )}
                </div>
            </div>

            {product && (
                <div className="mt-5 flex items-center gap-3 rounded-md border bg-muted/30 p-3">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="h-12 w-12 rounded-md border object-cover"
                    />

                    <div>
                        <p className="font-medium">{product.name}</p>

                        <p className="text-xs text-muted-foreground">SKU: {product.sku}</p>

                        <p className="text-xs text-muted-foreground">
                            Stock: {product.stockQuantity}
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}
