import type{
    Control,
    FieldErrors,
    UseFormRegister,
} from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { CustomerFormValues } from "@/lib/validations/customer.schema";

interface Props {
    register: UseFormRegister<CustomerFormValues>;
    control: Control<CustomerFormValues>;
    errors: FieldErrors<CustomerFormValues>;
}

export default function CustomerFields({
    register,
    errors,
}: Props) {
    return (
        <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
                <Label>Name</Label>

                <Input
                    placeholder="John Doe"
                    {...register("name")}
                />

                <p className="text-destructive text-sm">
                    {errors.name?.message}
                </p>
            </div>

            <div className="space-y-2">
                <Label>Email</Label>

                <Input
                    type="email"
                    placeholder="john@example.com"
                    {...register("email")}
                />

                <p className="text-destructive text-sm">
                    {errors.email?.message}
                </p>
            </div>

            <div className="space-y-2">
                <Label>Phone</Label>

                <Input
                    placeholder="017XXXXXXXX"
                    {...register("phone")}
                />

                <p className="text-destructive text-sm">
                    {errors.phone?.message}
                </p>
            </div>

            <div className="space-y-2 md:col-span-2">
                <Label>Address</Label>

                <Input
                    placeholder="Dhaka, Bangladesh"
                    {...register("address")}
                />

                <p className="text-destructive text-sm">
                    {errors.address?.message}
                </p>
            </div>
        </div>
    );
}