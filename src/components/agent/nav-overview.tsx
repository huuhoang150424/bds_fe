import {

  type LucideIcon,
} from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

const NavOverview = ({
    overview,
  }: {
    overview: {
      name: string,
      url: string,
      icon: LucideIcon,
    }[]
  }) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Tổng quan</SidebarGroupLabel>
      <SidebarMenu>
        {overview.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <Link to={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
            
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default NavOverview;
