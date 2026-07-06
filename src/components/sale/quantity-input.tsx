import { type FieldErrors, type UseFormRegister } from "react-hook-form"

import type { SaleFormValues } from "@/lib/validations/sale.schema"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Props {
    index: number
    register: UseFormRegister<SaleFormValues>
    errors: FieldErrors<SaleFormValues>
}

export default function QuantityInput({ index, register, errors }: Props) {
    return (
        <div className="space-y-2">
            <Label>Quantity</Label>

            <Input
                type="number"
                min={1}
                {...register(`products.${index}.quantity`, {
                    valueAsNumber: true,
                })}
            />

            <p className="text-sm text-destructive">
                {errors.products?.[index]?.quantity?.message}
            </p>
        </div>
    )
}
