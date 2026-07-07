import {
    Controller,
    type Control,
    type FieldErrors,
    type UseFormRegister,
} from "react-hook-form"

import { ProductCategory } from "@/types/product"
import type { ProductFormValues } from "@/lib/validations/product.schema"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface ProductFieldsProps {
    register: UseFormRegister<ProductFormValues>
    control: Control<ProductFormValues>
    errors: FieldErrors<ProductFormValues>
    image: File | null
    setImage: React.Dispatch<React.SetStateAction<File | null>>
}

export default function ProductFields({
    register,
    control,
    errors,
    image,
    setImage,
}: ProductFieldsProps) {
    return (
        <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
                <Label>Product Name</Label>

                <Input placeholder="MacBook Pro" {...register("name")} />

                <p className="text-sm text-destructive">{errors.name?.message}</p>
            </div>

            <div className="space-y-2">
                <Label>SKU</Label>

                <Input placeholder="SKU-1001" {...register("sku")} />

                <p className="text-sm text-destructive">{errors.sku?.message}</p>
            </div>

            <div className="space-y-2">
                <Label>Category</Label>

                <Controller
                    control={control}
                    name="category"
                    render={({ field }) => (
                        <Select value={field.value ?? ""} onValueChange={field.onChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>

                            <SelectContent>
                                {Object.values(ProductCategory).map((category) => (
                                    <SelectItem key={category} value={category}>
                                        {category}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />

                <p className="text-sm text-destructive">{errors.category?.message}</p>
            </div>

            <div className="space-y-2">
                <Label>Purchase Price</Label>

                <Input
                    type="number"
                    min={0}
                    step="0.01"
                    {...register("purchasePrice", {
                        valueAsNumber: true,
                    })}
                />

                <p className="text-sm text-destructive">
                    {errors.purchasePrice?.message}
                </p>
            </div>

            <div className="space-y-2">
                <Label>Selling Price</Label>

                <Input
                    type="number"
                    min={0}
                    step="0.01"
                    {...register("sellingPrice", {
                        valueAsNumber: true,
                    })}
                />

                <p className="text-sm text-destructive">
                    {errors.sellingPrice?.message}
                </p>
            </div>

            <div className="space-y-2">
                <Label>Stock Quantity</Label>

                <Input
                    type="number"
                    min={0}
                    {...register("stockQuantity", {
                        valueAsNumber: true,
                    })}
                />

                <p className="text-sm text-destructive">
                    {errors.stockQuantity?.message}
                </p>
            </div>

            <div className="space-y-2 md:col-span-2">
                <Label>Product Image</Label>

                <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files?.[0] ?? null)}
                />

                <p className="text-xs text-muted-foreground">JPG, JPEG, PNG or WEBP</p>
            </div>

            {image && (
                <div className="space-y-2 md:col-span-2">
                    <Label>Image Preview</Label>

                    <div className="overflow-hidden rounded-md border bg-muted p-2">
                        <img
                            src={URL.createObjectURL(image)}
                            alt="Preview"
                            className="h-52 w-full rounded-md object-contain"
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
