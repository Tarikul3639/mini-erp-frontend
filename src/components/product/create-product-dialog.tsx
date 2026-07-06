import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface CreateProductDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function CreateProductDialog({
    open,
    onOpenChange,
}: CreateProductDialogProps) {
    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>
                        Create Product
                    </DialogTitle>

                    <DialogDescription>
                        Fill in the information below to
                        create a new product.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-8 text-center text-sm text-muted-foreground">
                    Product form will be added in the
                    next step.
                </div>
            </DialogContent>
        </Dialog>
    );
}