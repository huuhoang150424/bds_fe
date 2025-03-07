
import { Outlet } from "react-router-dom";


import React from "react";
import { SidebarProvider, useSidebar } from "@/context/SidebarContext";
import Header from "@/components/admin/header";
import Sidebar from "@/components/admin/sidebar";

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  return (
    <div className="min-h-screen xl:flex">
      <div>
        <Sidebar />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <Header />
        <div className="p-4 mx-auto max-w-screen-2xl md:p-6">
          <Outlet />
        </div>
      </div>
      </div>
  );
};

const AdminLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default AdminLayout;
