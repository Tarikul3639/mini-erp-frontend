import { useEffect } from "react";
import {
    useNavigate,
    useParams,
} from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import CustomerFields from "./customer-fields";

import {
    customerSchema,
    type CustomerFormValues,
} from "@/lib/validations/customer.schema";

import {
    useGetCustomerQuery,
    useUpdateCustomerMutation,
} from "@/redux/features/customer/customerApi";

import PageLoader from "@/components/common/page-loader";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export default function EditCustomerForm() {
    const navigate = useNavigate();

    const { id } = useParams();

    const {
        data: customer,
        isLoading,
    } = useGetCustomerQuery(id!);

    const [
        updateCustomer,
        {
            isLoading:
                isUpdating,
        },
    ] =
        useUpdateCustomerMutation();

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

    useEffect(() => {
        if (!customer) return;

        reset({
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            address:
                customer.address,
        });
    }, [customer, reset]);

    const onSubmit = async (
        values: CustomerFormValues
    ) => {
        try {
            await updateCustomer({
                id: id!,
                body: values,
            }).unwrap();

            toast.success(
                "Customer updated successfully."
            );

            navigate("/customers");
        } catch (error: any) {
            toast.error(
                error?.data?.message ??
                    "Failed to update customer."
            );
        }
    };

    if (isLoading) {
        return <PageLoader />;
    }

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
                                isUpdating
                            }
                        >
                            {isUpdating
                                ? "Updating..."
                                : "Update Customer"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}