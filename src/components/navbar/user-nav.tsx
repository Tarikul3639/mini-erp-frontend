import {
    LogOut,
    User,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";
import { useGetProfileQuery } from "@/redux/features/user/userApi";

export default function UserNav() {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const { data } = useGetProfileQuery();

    const user = data?.data;

    const initials =
        user?.name
            ?.split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() ?? "U";

    const handleLogout = () => {
        dispatch(logout());

        navigate("/login", {
            replace: true,
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex h-10 items-center rounded-md px-2 transition-colors hover:bg-accent">
                <Avatar className="size-9 border">
                    <AvatarImage
                        src={user?.avatar}
                        alt={user?.name}
                    />

                    <AvatarFallback>
                        {initials}
                    </AvatarFallback>
                </Avatar>

                <div className="ml-3 hidden text-left lg:block">
                    <p className="max-w-32 truncate text-sm font-medium">
                        {user?.name ?? "User"}
                    </p>

                    <p className="text-muted-foreground max-w-32 truncate text-xs capitalize">
                        {user?.role?.toLowerCase() ??
                            "Admin"}
                    </p>
                </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-64"
            >
                <DropdownMenuGroup>
                    <DropdownMenuLabel>
                        <div className="space-y-1">
                            <p className="font-medium">
                                {user?.name}
                            </p>

                            <p className="text-muted-foreground text-xs">
                                {user?.email}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownMenuItem
                        onClick={() =>
                            navigate("/profile")
                        }
                    >
                        <User className="mr-2 h-4 w-4" />
                        Profile
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownMenuItem
                        onClick={handleLogout}
                        className="text-destructive focus:text-destructive"
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}