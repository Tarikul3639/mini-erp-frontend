import { Controller, type Control } from "react-hook-form";
import { useGetProductsQuery } from "@/redux/features/product/productApi";
import type { SaleFormValues } from "@/lib/validations/sale.schema";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";

interface Props {
    control: Control<SaleFormValues>;
}

export default function ProductSelect({
    control,
}: Props) {
    const { data } =
        useGetProductsQuery({
            page: 1,
            limit: 1000,
        });

    return (
        <div className="space-y-2">
            <Label>Product</Label>

            <Controller
                control={control}
                name="product"
                render={({ field }) => (
                    <Select
                        value={field.value}
                        onValueChange={
                            field.onChange
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select product" />
                        </SelectTrigger>

                        <SelectContent>
                            {data?.data.map(
                                (product) => (
                                    <SelectItem
                                        key={
                                            product._id
                                        }
                                        value={
                                            product._id
                                        }
                                    >
                                        {
                                            product.name
                                        }
                                    </SelectItem>
                                )
                            )}
                        </SelectContent>
                    </Select>
                )}
            />
        </div>
    );
}