import { NavLink, useLocation } from "react-router";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./sidebar";
import { sidebarRoutes } from "~/lib/routes";

  export function AppSidebar() {
    const location = useLocation();

    return (
      <Sidebar>
        <SidebarHeader />
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel className="text-2xl mb-4">TBIZ</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                    {sidebarRoutes.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton variant={location.pathname === item.url ? "outline" : "default"} asChild>
                                <NavLink to={item.url}>
                                    <item.icon />
                                    <span>{item.title}</span>
                                </NavLink>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    )
  }
  