import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  ChartNoAxesCombined,
  ArrowLeftRight,
} from "lucide-react";

const AppSidebar = () => {
  const items = [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
      color: "text-blue-500",
    },
    {
      title: "Transactions",
      url: "/transactions",
      icon: ArrowLeftRight,
      color: "text-green-500",
    },
    {
      title: "Analysis",
      url: "/analysis",
      icon: ChartNoAxesCombined,
      color: "text-red-500",
    },
  ];
  return (
    <Sidebar className="mt-[76px] z-100" collapsible="icon" variant="sidebar">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon className={`${item.color}`} /> <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
