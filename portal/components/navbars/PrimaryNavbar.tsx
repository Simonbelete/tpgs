import React from "react";
import { useProSidebar } from "react-pro-sidebar";
import { useRouter } from "next/router";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import Icon from "@mui/material/Icon";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Image from "next/image";
import ILRILogo from "../logos/ILRILogo";
import { FarmsMenu } from "@/features/farms";

const PrimaryNavbar = () => {
  const { collapseSidebar, toggleSidebar } = useProSidebar();
  const router = useRouter();

  const handleLogout = () => {
    router.push("/api/logout");
  };

  return (
    <AppBar
      position="static"
      elevation={1}
      sx={{ borderBottom: "1px solid #e3e1e1" }}
      color="transparent"
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => {
            // collapseSidebar();
            toggleSidebar();
          }}
        >
          <MenuOpenIcon />
        </IconButton>
        <div>
          <ILRILogo />
        </div>
        <Box sx={{ flexGrow: 1 }}></Box>
        <Stack
          direction={"row"}
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <FarmsMenu />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default PrimaryNavbar;
