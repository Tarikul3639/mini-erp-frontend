import { toast } from "sonner"

import { useDeleteSaleMutation } from "@/redux/features/sale/saleApi"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
    saleId: string
}

export default function DeleteSaleDialog({
    open,
    onOpenChange,
    saleId,
}: Props) {
    const [deleteSale, { isLoading }] = useDeleteSaleMutation()

    const handleDelete = async () => {
        try {
            await deleteSale(saleId).unwrap()

            toast.success("Sale deleted successfully.")

            onOpenChange(false)
        } catch (error: any) {
            toast.error(error?.data?.message ?? "Failed to delete sale.")
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Sale</AlertDialogTitle>

                    <AlertDialogDescription>
                        This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>

                    <AlertDialogAction disabled={isLoading} onClick={handleDelete}>
                        {isLoading ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
