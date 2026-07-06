import {
    LayoutDashboard,
    Package,
    Users,
    ShoppingCart,
    UserCircle,
} from "lucide-react"

export const navigation = [
    {
        title: "Dashboard",
        href: "/",
        icon: LayoutDashboard,
    },

    {
        title: "Products",
        href: "/products",
        icon: Package,
    },

    {
        title: "Customers",
        href: "/customers",
        icon: Users,
    },

    {
        title: "Sales",
        href: "/sales",
        icon: ShoppingCart,
    },
    {
        title: "Profile",
        href: "/profile",
        icon: UserCircle,
    },
]
