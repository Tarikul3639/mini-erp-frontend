import {
    Bell,
    Moon,
    Search,
    Sun,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import UserNav from "./user-nav";

export default function AppNavbar() {
    return (
        <header className="bg-background sticky top-0 z-20 flex h-16 items-center justify-between border-b px-6">
            <div className="flex items-center gap-3">
                <SidebarTrigger />

                <div className="relative hidden md:block">
                    <Search className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />

                    <Input
                        className="w-72 pl-9"
                        placeholder="Search..."
                    />
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="icon"
                >
                    <Bell className="size-5" />
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                >
                    <Sun className="size-5 dark:hidden" />
                    <Moon className="hidden size-5 dark:block" />
                </Button>

                <UserNav />
            </div>
        </header>
    );
}