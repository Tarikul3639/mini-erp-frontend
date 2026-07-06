import { Link } from "react-router-dom"
import { PackagePlus, ShoppingCart, UserPlus } from "lucide-react"

import { useRole } from "@/hooks/useRole"

const actions = [
  {
    title: "Add Product",
    icon: PackagePlus,
    href: "/products/create",
    color: "text-blue-600 bg-blue-50",
    roles: ["ADMIN", "MANAGER"],
  },
  {
    title: "Add Customer",
    icon: UserPlus,
    href: "/customers/create",
    color: "text-emerald-600 bg-emerald-50",
    roles: ["ADMIN", "MANAGER"],
  },
  {
    title: "New Sale",
    icon: ShoppingCart,
    href: "/sales/create",
    color: "text-orange-600 bg-orange-50",
    roles: ["ADMIN", "MANAGER", "EMPLOYEE"],
  },
]

export default function QuickActions() {
  const { role } = useRole()

  const visibleActions = actions.filter(
    (action) => role && action.roles.includes(role)
  )

  if (!visibleActions.length) return null

  return (
    <section className="rounded-lg border bg-card p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-semibold">Quick Actions</h2>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        {visibleActions.map((action) => {
          const Icon = action.icon

          return (
            <Link
              key={action.href}
              to={action.href}
              className="flex items-center gap-3 rounded-lg border bg-background p-3 transition-colors hover:border-primary hover:bg-accent/40"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-md ${action.color}`}
              >
                <Icon className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{action.title}</p>
                <p className="text-xs text-muted-foreground">Open</p>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}