import { SettingsIcon } from "lucide-react";
import { NavLink, useLocation } from "react-router";
import { sidebarRoutes } from "~/lib/routes";
import CustomSheet from "../custom-sheet";
import SettingsForm from "../SettingsForm";
import { Separator } from "./separator";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./sidebar";

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
            <Separator />
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <CustomSheet
                    title="Settings"
                    description="Update your settings"
                    trigger={<SidebarMenuButton>
                      <SettingsIcon className="w-4 h-4"/>
                      <span>Settings</span>
                    </SidebarMenuButton>}
                    >
                      <SettingsForm />
                    </CustomSheet>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    )
  }
  