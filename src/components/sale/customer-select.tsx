import { Controller,type Control } from "react-hook-form";
import { useGetCustomersQuery } from "@/redux/features/customer/customerApi";
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

export default function CustomerSelect({
    control,
}: Props) {
    const { data } =
        useGetCustomersQuery({
            page: 1,
            limit: 1000,
        });

    return (
        <div className="space-y-2">
            <Label>Customer</Label>

            <Controller
                control={control}
                name="customer"
                render={({ field }) => (
                    <Select
                        value={field.value}
                        onValueChange={
                            field.onChange
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select customer" />
                        </SelectTrigger>

                        <SelectContent>
                            {data?.data.map(
                                (customer) => (
                                    <SelectItem
                                        key={
                                            customer._id
                                        }
                                        value={
                                            customer._id
                                        }
                                    >
                                        {
                                            customer.name
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