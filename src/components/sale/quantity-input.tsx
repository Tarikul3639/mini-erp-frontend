import {
   type UseFormRegister,
   type FieldErrors,
} from "react-hook-form";

import type { SaleFormValues } from "@/lib/validations/sale.schema";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
    register: UseFormRegister<SaleFormValues>;
    errors: FieldErrors<SaleFormValues>;
}

export default function QuantityInput({
    register,
    errors,
}: Props) {
    return (
        <div className="space-y-2">
            <Label>Quantity</Label>

            <Input
                type="number"
                min={1}
                {...register(
                    "quantity",
                    {
                        valueAsNumber: true,
                    }
                )}
            />

            <p className="text-destructive text-sm">
                {errors.quantity?.message}
            </p>
        </div>
    );
}