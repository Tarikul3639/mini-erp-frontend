import { Outlet } from "react-router-dom";

import AppShell from "@/components/layout/app-shell";

export default function DashboardLayout() {
    return (
        <AppShell>
            <Outlet />
        </AppShell>
    );
}