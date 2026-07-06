import type { ReactNode } from "react"
import { Navigate } from "react-router-dom"

import PageLoader from "@/components/common/page-loader"
import { useRole, type UserRole } from "@/hooks/useRole"

interface Props {
    children: ReactNode
    allow: UserRole[]
}

export default function RoleRoute({ children, allow }: Props) {
    const { role } = useRole()

    if (!role) {
        return <PageLoader />
    }

    if (!allow.includes(role)) {
        return <Navigate to="/" replace />
    }

    return children
}
