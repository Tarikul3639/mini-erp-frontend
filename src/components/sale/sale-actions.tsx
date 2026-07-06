import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { MoreHorizontal, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import DeleteSaleDialog from "./delete-sale-dialog"

interface Props {
    saleId: string
}

export default function SaleActions({ saleId }: Props) {
    const navigate = useNavigate()

    const [open, setOpen] = useState(false)

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button variant="ghost" size="icon">
                        <MoreHorizontal className="size-4" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => navigate(`/sales/${saleId}`)}>
                        <Eye className="mr-2 size-4" />
                        View
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => setOpen(true)}
                    >
                        <Trash2 className="mr-2 size-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <DeleteSaleDialog open={open} onOpenChange={setOpen} saleId={saleId} />
        </>
    )
}
