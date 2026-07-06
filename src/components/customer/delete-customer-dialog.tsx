import { toast } from "sonner";

import { useDeleteCustomerMutation } from "@/redux/features/customer/customerApi";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Props {
    open: boolean;
    onOpenChange: (
        open: boolean
    ) => void;
    customerId: string;
}

export default function DeleteCustomerDialog({
    open,
    onOpenChange,
    customerId,
}: Props) {
    const [
        deleteCustomer,
        { isLoading },
    ] =
        useDeleteCustomerMutation();

    const handleDelete =
        async () => {
            try {
                await deleteCustomer(
                    customerId
                ).unwrap();

                toast.success(
                    "Customer deleted successfully."
                );

                onOpenChange(false);
            } catch (error: any) {
                toast.error(
                    error?.data
                        ?.message ??
                        "Failed to delete customer."
                );
            }
        };

    return (
        <AlertDialog
            open={open}
            onOpenChange={
                onOpenChange
            }
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Delete Customer
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        This action cannot
                        be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        disabled={
                            isLoading
                        }
                        onClick={
                            handleDelete
                        }
                    >
                        {isLoading
                            ? "Deleting..."
                            : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}