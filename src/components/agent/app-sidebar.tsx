import * as React from "react";
import { NavMain } from "@/components/agent/nav-main";
import { NavProjects } from "@/components/agent/nav-projects";
import { TeamSwitcher } from "@/components/agent/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { data } from "@/constant/nav-agent";
import NavOverview from "./nav-overview";


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavOverview overview={data.overview} />
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
