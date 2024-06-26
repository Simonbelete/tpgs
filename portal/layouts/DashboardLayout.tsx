import React, { ReactElement } from "react";
import { ProSidebarProvider, useProSidebar } from "react-pro-sidebar";
import PrimaryNavbar from "../components/navbars/PrimaryNavbar";
import { Sidebar } from "../components/menus";
import { useTheme } from "@mui/material/styles";
import { SuperUserBanner } from "../components/banners";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Box } from "@mui/material";

interface DashboardLayoutProps {
  children: ReactElement | ReactElement[];
}

const DashboardLayout = (props: DashboardLayoutProps) => {
  const { children } = props;
  const theme = useTheme();
  const settingState = useSelector((state: RootState) => state.setting);

  return (
    <ProSidebarProvider>
      <div style={{ height: "100vh", display: "flex" }}>
        <Sidebar />
        <div style={{ overflowY: "scroll", width: "100%" }}>
          {settingState.superUserMode && <SuperUserBanner />}
          <PrimaryNavbar />
          <Box
            sx={{
              p: { xs: "10px", md: "30px" },
              minHeight: "100%",
              height: "auto",
              background: theme.palette.background.default,
              position: "relative",
            }}
            id="body"
          >
            {children}
          </Box>
        </div>
      </div>
    </ProSidebarProvider>
  );
};

export default DashboardLayout;
