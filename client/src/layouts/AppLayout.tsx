import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <SidebarProvider defaultOpen>
      <AppSidebar />
      <main className="w-full px-2">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default AppLayout;
