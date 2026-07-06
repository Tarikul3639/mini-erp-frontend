import {
    LogOut,
    User,
} from "lucide-react";

import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";

export default function UserNav() {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());

        navigate("/login", {
            replace: true,
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex h-10 items-center rounded-md px-2 hover:bg-accent">
                <Avatar className="size-8">
                    <AvatarFallback>A</AvatarFallback>
                </Avatar>

                <div className="ml-2 hidden text-left lg:block">
                    <p className="text-sm font-medium">
                        Admin
                    </p>

                    <p className="text-muted-foreground text-xs">
                        Administrator
                    </p>
                </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-56"
            >
                <DropdownMenuItem>
                    <User className="mr-2 size-4" />

                    Profile
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600"
                >
                    <LogOut className="mr-2 size-4" />

                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}