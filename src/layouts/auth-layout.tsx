import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAppSelector } from "@/redux/hooks";

interface Props {
    children: ReactNode;
}

export default function AuthLayout({
    children,
}: Props) {
    const token = useAppSelector(
        (state) => state.auth.accessToken
    );

    if (token) {
        return <Navigate to="/" replace />;
    }

    return (
        <main className="bg-muted/30 flex min-h-screen items-center justify-center p-4">
            {children}
        </main>
    );
}