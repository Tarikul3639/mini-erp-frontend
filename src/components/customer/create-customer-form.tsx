import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import {
    customerSchema,
    type CustomerFormValues,
} from "@/lib/validations/customer.schema";

import { useCreateCustomerMutation } from "@/redux/features/customer/customerApi";

import CustomerFields from "./customer-fields";

import { Button } from "@/components/ui/button";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

export default function CreateCustomerForm() {
    const navigate = useNavigate();

    const [
        createCustomer,
        { isLoading },
    ] =
        useCreateCustomerMutation();

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: {
            errors,
        },
    } = useForm<CustomerFormValues>({
        resolver:
            zodResolver(customerSchema),
    });

    const onSubmit = async (
        values: CustomerFormValues
    ) => {
        try {
            await createCustomer(
                values
            ).unwrap();

            toast.success(
                "Customer created successfully."
            );

            reset();

            navigate("/customers");
        } catch (error: any) {
            toast.error(
                error?.data?.message ??
                    "Failed to create customer."
            );
        }
    };

    return (
        <Card>
            <CardContent className="p-6">
                <form
                    onSubmit={handleSubmit(
                        onSubmit
                    )}
                    className="space-y-6"
                >
                    <CustomerFields
                        register={
                            register
                        }
                        control={
                            control
                        }
                        errors={
                            errors
                        }
                    />

                    <div className="flex justify-end gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                                navigate(
                                    "/customers"
                                )
                            }
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={
                                isLoading
                            }
                        >
                            {isLoading
                                ? "Creating..."
                                : "Create Customer"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}