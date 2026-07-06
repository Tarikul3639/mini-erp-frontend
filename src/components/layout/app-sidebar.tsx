import { NavLink } from "react-router-dom"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

import Logo from "@/components/common/logo"
import { navigation } from "@/constants/navigation"

export default function AppSidebar() {
    return (
        <Sidebar variant="sidebar" collapsible="offcanvas" className="border-r">
            <SidebarHeader className="border-b px-3 py-4">
                <Logo />
            </SidebarHeader>

            <SidebarContent className="px-2 py-3">
                <SidebarMenu>
                    {navigation.map((item) => (
                        <SidebarMenuItem key={item.href}>
                            <NavLink to={item.href} end={item.href === "/"}>
                                {({ isActive }) => (
                                    <SidebarMenuButton
                                        isActive={isActive}
                                        tooltip={item.title}
                                        className="h-11 rounded-lg"
                                    >
                                        <item.icon className="size-5 shrink-0" />

                                        <span className="truncate">{item.title}</span>
                                    </SidebarMenuButton>
                                )}
                            </NavLink>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter className="border-t px-3 py-4">
                <p className="text-center text-xs text-muted-foreground">
                    Mini ERP v1.0.0
                </p>
            </SidebarFooter>
        </Sidebar>
    )
}
