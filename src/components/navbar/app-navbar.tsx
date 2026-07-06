import { SidebarTrigger } from "@/components/ui/sidebar";

import SearchBar from "./search-bar";
import NotificationMenu from "./notification-menu";
import ThemeToggle from "./theme-toggle";
import UserNav from "./user-nav";

export default function AppNavbar() {
    return (
        <header className="bg-background sticky top-0 z-30 flex h-18 items-center justify-between border-b px-6 backdrop-blur supports-backdrop-filter:bg-background/80">
            <div className="flex items-center gap-3">
                <SidebarTrigger />

                <SearchBar />
            </div>

            <div className="flex items-center gap-2">
                <NotificationMenu />

                <ThemeToggle />

                <UserNav />
            </div>
        </header>
    );
}