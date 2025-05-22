import * as React from "react";
import { NavMain } from "@/components/agent/nav-main";
import { TeamSwitcher } from "@/components/agent/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
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

      </SidebarContent>
      <SidebarFooter>
        <img src="../../../public/gif_nen.gif" alt="" className="w-[120px] h-[90px] self-start object-cover" />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
