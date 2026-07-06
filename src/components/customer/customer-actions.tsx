import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    MoreHorizontal,
    Pencil,
    Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

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
                onOpenChange={
                    setOpen
                }
                customerId={
                    customerId
                }
            />
        </>
    );
}