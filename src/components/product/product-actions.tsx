import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import {
    Edit,
    MoreHorizontal,
    Trash2,
} from "lucide-react";

import DeleteProductDialog from "./delete-product-dialog";

interface Props {
    productId: string;
}

export default function ProductActions({
    productId,
}: Props) {
    const navigate =
        useNavigate();

    const [open, setOpen] =
        useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger
                >
                    <Button
                        variant="ghost"
                        size="icon"
                    >
                        <MoreHorizontal className="size-4" />
                    </Button>
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
                onOpenChange={
                    setOpen
                }
                productId={
                    productId
                }
            />
        </>
    );
}