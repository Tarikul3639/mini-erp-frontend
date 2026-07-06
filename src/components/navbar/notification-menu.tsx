import { Bell } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function NotificationMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className="relative inline-flex h-9 w-9 items-center justify-center rounded-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
                <Bell className="h-5 w-5" />

                {/* <span className="bg-destructive absolute right-2 top-2 h-2 w-2 rounded-full" /> */}
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-56"
            >
                <DropdownMenuItem>
                    No notifications
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}