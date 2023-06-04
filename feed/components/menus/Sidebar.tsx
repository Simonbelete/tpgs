import React from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  MenuItemStyles,
  menuClasses,
} from "react-pro-sidebar";
import Link from "next/link";
import { Grid, Typography } from "@mui/material";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import { useTheme } from "@mui/material/styles";
import WorkspacesIcon from "@mui/icons-material/Workspaces";

const SidebarMenu = () => {
  const theme = useTheme();

  const sidebarTheme = {
    sidebar: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.text.secondary,
    },
    menu: {
      menuContent: theme.palette.secondary.main,
      icon: theme.palette.text.secondary,
      hover: {
        backgroundColor: theme.palette.secondary.dark,
        color: theme.palette.primary.main,
      },
      disabled: {
        color: "#9fb6cf",
      },
    },
  };

  const menuItemStyles: MenuItemStyles = {
    root: {
      fontSize: "13px",
      fontWeight: 400,
    },
    icon: {
      color: sidebarTheme.menu.icon,
      [`&.${menuClasses.disabled}`]: {
        color: sidebarTheme.menu.disabled.color,
      },
    },
    SubMenuExpandIcon: {
      color: "#b6b7b9",
    },
    subMenuContent: ({ level }) => ({
      backgroundColor: sidebarTheme.menu.menuContent,
    }),
    button: {
      [`&.${menuClasses.disabled}`]: {
        color: sidebarTheme.menu.disabled.color,
      },
      "&:hover": {
        backgroundColor: sidebarTheme.menu.hover.backgroundColor,
        color: sidebarTheme.menu.hover.color,
      },
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  };

  return (
    <Sidebar
      style={{ height: "100vh" }}
      breakPoint="md"
      backgroundColor={theme.palette.secondary.main}
      rootStyles={{ color: theme.palette.text.secondary }}
    >
      <Grid container justifyContent="center" mt={2} mb={3} spacing={2}>
        <Grid item>
          <img src="/images/feed_formulation_icon.png" alt="" width={35} />
        </Grid>
        <Grid item>
          <Typography
            sx={{ textDecoration: "none" }}
            fontWeight={700}
            fontSize={20}
            color="primary.dark"
          >
            Feed Formulation
          </Typography>
        </Grid>
      </Grid>
      <Menu menuItemStyles={menuItemStyles}>
        <SubMenu
          label={<Typography variant="body1">Nutrients</Typography>}
          icon={<BubbleChartIcon />}
        >
          <MenuItem
            component={<Link href="/nutrients" />}
            icon={<BubbleChartIcon fontSize="small" />}
          >
            <Typography variant="body1" fontSize={14}>
              Nutrients
            </Typography>
          </MenuItem>
          <MenuItem
            component={<Link href="/nutrient-groups" />}
            icon={<WorkspacesIcon fontSize="small" />}
          >
            <Typography variant="body1" fontSize={14}>
              Nutrient Group
            </Typography>
          </MenuItem>
        </SubMenu>

        <MenuItem
          component={<Link href="/ingredients" />}
          icon={<BubbleChartIcon />}
        >
          <Typography variant="body1">Ingredients</Typography>
        </MenuItem>
        {/* <MenuItem
          component={<Link href="/ingredients" />}
          icon={<BloodtypeIcon />}
        >
          Ingredients
        </MenuItem>
        <MenuItem component={<Link href="/rations" />} icon={<BloodtypeIcon />}>
          Rations
        </MenuItem>
        <MenuItem
          component={<Link href="/ingredient-types" />}
          icon={<BloodtypeIcon />}
        >
          Ingredient Types
        </MenuItem>
        <MenuItem component={<Link href="/legend" />} icon={<BloodtypeIcon />}>
          Legend
        </MenuItem> */}
      </Menu>
    </Sidebar>
  );
};

export default SidebarMenu;
