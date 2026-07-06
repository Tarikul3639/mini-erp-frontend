import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Edit,
    MoreHorizontal,
    Trash2,
} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import DeleteProductDialog from "./delete-product-dialog";

interface Props {
    productId: string;
}

export default function ProductActions({
    productId,
}: Props) {
    const navigate = useNavigate();

    const [open, setOpen] =
        useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger
                    className="inline-flex h-9 w-9 items-center justify-center rounded-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                    <MoreHorizontal className="size-4" />
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    <DropdownMenuItem
                        onClick={() =>
                            navigate(
                                `/products/${productId}/edit`
                            )
                        }
                    >
                        <Edit className="mr-2 size-4" />
                        Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="text-destructive"
                        onClick={() =>
                            setOpen(true)
                        }
                    >
                        <Trash2 className="mr-2 size-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <DeleteProductDialog
                open={open}
                onOpenChange={setOpen}
                productId={productId}
            />
        </>
    );
}