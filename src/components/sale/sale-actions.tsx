import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Eye,
    MoreHorizontal,
    Trash2,
} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import DeleteSaleDialog from "./delete-sale-dialog";

interface Props {
    saleId: string;
}

export default function SaleActions({
    saleId,
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
                                `/sales/${saleId}`
                            )
                        }
                    >
                        <Eye className="mr-2 size-4" />
                        View
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

            <DeleteSaleDialog
                open={open}
                onOpenChange={setOpen}
                saleId={saleId}
            />
        </>
    );
}