import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    MoreHorizontal,
    Pencil,
    Trash2,
} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import DeleteCustomerDialog from "./delete-customer-dialog";

interface Props {
    customerId: string;
}

export default function CustomerActions({
    customerId,
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
                                `/customers/${customerId}/edit`
                            )
                        }
                    >
                        <Pencil className="mr-2 size-4" />
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

            <DeleteCustomerDialog
                open={open}
                onOpenChange={setOpen}
                customerId={customerId}
            />
        </>
    );
}