import React, { ReactElement } from "react";
import { ProSidebarProvider, useProSidebar } from "react-pro-sidebar";
import PrimaryNavbar from "../navbars/PrimaryNavbar";
import { Sidebar } from "../menus";

interface DashboardLayoutProps {
  children: ReactElement | ReactElement[];
}

const DashboardLayout = (props: DashboardLayoutProps) => {
  const { children } = props;
  return (
    <ProSidebarProvider>
      <div style={{ height: "100vh", display: "flex" }}>
        <Sidebar />
        <div style={{ overflowY: "scroll", width: "100%" }}>
          <PrimaryNavbar />
          <div
            style={{ padding: "30px", height: "100%", background: "#fbfbfb" }}
          >
            {children}
          </div>
        </div>
      </div>
    </ProSidebarProvider>
  );
};

export default DashboardLayout;
