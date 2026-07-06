import { NavLink } from "react-router-dom";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

import { navigation } from "@/constants/navigation";
import Logo from "@/components/common/logo";

export default function AppSidebar() {
    return (
        <Sidebar variant="inset" collapsible="icon">
            <SidebarHeader className="border-b p-4">
                <Logo />
            </SidebarHeader>

            <SidebarContent className="p-3">
                <SidebarMenu>
                    {navigation.map((item) => (
                        <SidebarMenuItem key={item.href}>
                            <NavLink to={item.href} end={item.href === "/"}>
                                {({ isActive }) => (
                                    <SidebarMenuButton
                                        isActive={isActive}
                                        tooltip={item.title}
                                    >
                                        <item.icon />

                                        <span>{item.title}</span>
                                    </SidebarMenuButton>
                                )}
                            </NavLink>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter className="border-t p-4">
                <p className="text-muted-foreground text-xs">
                    Mini ERP v1.0.0
                </p>
            </SidebarFooter>
        </Sidebar>
    );
}