import { toast } from "sonner";

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

import { useDeleteProductMutation } from "@/redux/features/product/productApi";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    productId: string;
}

export default function DeleteProductDialog({
    open,
    onOpenChange,
    productId,
}: Props) {
    const [deleteProduct, { isLoading }] =
        useDeleteProductMutation();

    const handleDelete = async () => {
        try {
            await deleteProduct(
                productId
            ).unwrap();

            toast.success(
                "Product deleted successfully"
            );

            onOpenChange(false);
        } catch (error: any) {
            toast.error(
                error?.data?.message ??
                    "Failed to delete product"
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
                        Delete Product?
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
                        onClick={
                            handleDelete
                        }
                        disabled={
                            isLoading
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