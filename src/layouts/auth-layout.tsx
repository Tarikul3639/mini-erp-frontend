import type { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function AuthLayout({
    children,
}: Props) {
    return (
        <main className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
            {children}
        </main>
    );
}