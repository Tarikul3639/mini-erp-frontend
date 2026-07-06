import type { ReactNode } from "react";

import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar";

import AppSidebar from "./app-sidebar";
import AppNavbar from "./app-navbar";

interface Props {
    children: ReactNode;
}

export default function AppShell({
    children,
}: Props) {
    return (
        <SidebarProvider>
            <AppSidebar />

            <SidebarInset>
                <AppNavbar />

                <main className="bg-muted/30 flex-1 p-6">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}