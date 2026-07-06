import { Link } from "react-router-dom"

import { Package, ShoppingCart, User } from "lucide-react"

import type { SearchCustomer, SearchProduct, SearchSale } from "@/types/search"

type Props =
    | {
        type: "product"
        item: SearchProduct
    }
    | {
        type: "customer"
        item: SearchCustomer
    }
    | {
        type: "sale"
        item: SearchSale
    }

export default function SearchItem(props: Props) {
    if (props.type === "product") {
        return (
            <Link
                to={`/products/${props.item._id}/edit`}
                className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-muted"
            >
                <img
                    src={props.item.image}
                    alt={props.item.name}
                    className="h-10 w-10 rounded border object-cover"
                />

                <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{props.item.name}</p>

                    <p className="text-xs text-muted-foreground">{props.item.sku}</p>
                </div>

                <Package className="h-4 w-4 text-muted-foreground" />
            </Link>
        )
    }

    if (props.type === "customer") {
        return (
            <Link
                to={`/customers/${props.item._id}/edit`}
                className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-muted"
            >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-4 w-4 text-primary" />
                </div>

                <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{props.item.name}</p>

                    <p className="text-xs text-muted-foreground">{props.item.phone}</p>
                </div>
            </Link>
        )
    }

    return (
        <Link
            to={`/sales/${props.item._id}`}
            className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-muted"
        >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <ShoppingCart className="h-4 w-4 text-primary" />
            </div>

            <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{props.item.customer.name}</p>

                <p className="text-xs text-muted-foreground">
                    ৳{props.item.grandTotal.toLocaleString()}
                </p>
            </div>
        </Link>
    )
}
