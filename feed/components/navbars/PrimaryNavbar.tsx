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
} from "@mui/material";
import Icon from "@mui/material/Icon";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Image from "next/image";
import { AppsDropdown } from "../menus";

const PrimaryNavbar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
          <img src="/images/ilri_logo.png" alt="ILIR CGIAR Logo" height={25} />
        </div>
        <Box sx={{ flexGrow: 1 }}></Box>
        <div>
          <AppsDropdown />
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <Icon>manage_accounts</Icon>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default PrimaryNavbar;
