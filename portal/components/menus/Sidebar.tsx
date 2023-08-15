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
import { Divider, Grid, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import BalanceIcon from "@mui/icons-material/Balance";
import ScienceIcon from "@mui/icons-material/Science";
import PeopleIcon from "@mui/icons-material/People";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import CircleIcon from "@mui/icons-material/Circle";
import AdjustIcon from "@mui/icons-material/Adjust";
import LocalDiningIcon from "@mui/icons-material/LocalDining";

const SidebarMenu = () => {
  const theme = useTheme();

  const sidebarTheme = {
    sidebar: {
      backgroundColor: theme.palette.secondary.dark,
      color: theme.palette.text.secondary,
    },
    menu: {
      menuContent: theme.palette.secondary.dark,
      icon: theme.palette.text.secondary,
      hover: {
        backgroundColor: "#202d32",
        color: "#bfd2ef",
        fontSize: "13px",
      },
      disabled: {
        color: "#9fb6cf",
      },
    },
  };

  const menuItemStyles: MenuItemStyles = {
    root: {
      fontFamily: theme.typography.fontFamily,
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
      backgroundColor={sidebarTheme.sidebar.backgroundColor}
      rootStyles={{
        color: sidebarTheme.sidebar.color,
      }}
    >
      <Grid container justifyContent="center" mt={1} spacing={2}>
        <Grid item>
          <img src="/images/logo_full.png" alt="" height={35} />
        </Grid>
      </Grid>
      <Box my={1}>
        <Divider />
      </Box>

      <Menu menuItemStyles={menuItemStyles}>
        <SubMenu
          label={
            <Typography variant="body1" fontSize={14}>
              Users
            </Typography>
          }
          icon={<PeopleIcon fontSize="small" />}
        >
          <MenuItem component={<Link href="/users" />}>
            <Typography variant="body1" fontSize={14}>
              Users
            </Typography>
          </MenuItem>
          <MenuItem component={<Link href="/invitations" />}>
            <Typography variant="body1" fontSize={14}>
              Invitations
            </Typography>
          </MenuItem>
        </SubMenu>

        <SubMenu
          label={
            <Typography variant="body1" fontSize={14}>
              Units
            </Typography>
          }
          icon={<BalanceIcon fontSize="small" />}
        >
          <MenuItem component={<Link href="/units" />}>
            <Typography variant="body1" fontSize={14}>
              Units
            </Typography>
          </MenuItem>
          <MenuItem component={<Link href="/unit-converters" />}>
            <Typography variant="body1" fontSize={14}>
              Units Convertor
            </Typography>
          </MenuItem>
        </SubMenu>
        <MenuItem
          component={<Link href="/purposes" />}
          icon={<CrisisAlertIcon fontSize="small" />}
        >
          <Typography variant="body1" fontSize={14}>
            Production Purpose
          </Typography>
        </MenuItem>
      </Menu>
      <div
        style={{ padding: "0 24px", marginBottom: "8px", marginTop: "32px" }}
      >
        <Typography
          variant="caption"
          fontWeight={500}
          style={{ opacity: 0.6, letterSpacing: "0.5px" }}
        >
          Feed Formulation
        </Typography>
      </div>
      <Menu menuItemStyles={menuItemStyles}>
        <SubMenu
          label={
            <Typography variant="body1" fontSize={14}>
              Formulate
            </Typography>
          }
          icon={<ScienceIcon fontSize="small" />}
        >
          <MenuItem component={<Link href="/formulation/formulas" />}>
            <Typography variant="body1" fontSize={14}>
              Formula
            </Typography>
          </MenuItem>
          <MenuItem component={<Link href="/formulation/experimental" />}>
            <Typography variant="body1" fontSize={14}>
              Experimental
            </Typography>
          </MenuItem>
        </SubMenu>
        <SubMenu
          label={
            <Typography variant="body1" fontSize={14}>
              Ingredients
            </Typography>
          }
          icon={<LocalDiningIcon />}
        >
          <MenuItem
            component={<Link href="/ingredients" />}
            icon={<AdjustIcon fontSize="small" />}
          >
            <Typography variant="body1" fontSize={14}>
              Ingredients
            </Typography>
          </MenuItem>
          <MenuItem
            component={<Link href="/ingredient-types" />}
            icon={<AdjustIcon fontSize="small" />}
          >
            <Typography variant="body1" fontSize={14}>
              Ingredient Type
            </Typography>
          </MenuItem>
        </SubMenu>
        <SubMenu
          label={
            <Typography variant="body1" fontSize={14}>
              Nutrients
            </Typography>
          }
          icon={<BubbleChartIcon />}
        >
          <MenuItem
            component={<Link href="/nutrients" />}
            icon={<AdjustIcon fontSize="small" />}
          >
            <Typography variant="body1" fontSize={14}>
              Nutrients
            </Typography>
          </MenuItem>
          <MenuItem
            component={<Link href="/nutrient-groups" />}
            icon={<AdjustIcon fontSize="small" />}
          >
            <Typography variant="body1" fontSize={14}>
              Nutrient Group
            </Typography>
          </MenuItem>
        </SubMenu>
      </Menu>
      {/* <div
        style={{ padding: "0 24px", marginBottom: "8px", marginTop: "32px" }}
      >
        <Typography
          variant="caption"
          fontWeight={500}
          style={{ opacity: 0.6, letterSpacing: "0.5px" }}
        >
          Breeding
        </Typography>
      </div> */}
      {/* <Menu menuItemStyles={menuItemStyles}>
        <SubMenu
          label={
            <Typography variant="body1" fontSize={14}>
              Flocks
            </Typography>
          }
          icon={<ScienceIcon fontSize="small" />}
        >
          <MenuItem component={<Link href="/flocks" />}>
            <Typography variant="body1" fontSize={14}>
              Flocks
            </Typography>
          </MenuItem>
          <MenuItem component={<Link href="/flocks/reduction" />}>
            <Typography variant="body1" fontSize={14}>
              Reduction
            </Typography>
          </MenuItem>
        </SubMenu>
        <MenuItem component={<Link href="/chickens" />}>
          <Typography variant="body1" fontSize={14}>
            Chickens
          </Typography>
        </MenuItem>
        <MenuItem component={<Link href="/breeds" />}>
          <Typography variant="body1" fontSize={14}>
            Breeds
          </Typography>
        </MenuItem>
        <MenuItem component={<Link href="/eggs" />}>
          <Typography variant="body1" fontSize={14}>
            Eggs
          </Typography>
        </MenuItem>
        <MenuItem component={<Link href="/feeds" />}>
          <Typography variant="body1" fontSize={14}>
            Feeds
          </Typography>
        </MenuItem>
      </Menu> */}
      {/* <div
        style={{ padding: "0 24px", marginBottom: "8px", marginTop: "32px" }}
      >
        <Typography
          variant="caption"
          fontWeight={500}
          style={{ opacity: 0.6, letterSpacing: "0.5px" }}
        >
          Compare
        </Typography>
      </div> */}
      {/* <Menu menuItemStyles={menuItemStyles}>
        <MenuItem component={<Link href="/chickens" />}>
          <Typography variant="body1" fontSize={14}>
            Body Weight
          </Typography>
        </MenuItem>
        <MenuItem component={<Link href="/breeds" />}>
          <Typography variant="body1" fontSize={14}>
            Egg Grading
          </Typography>
        </MenuItem>
        <MenuItem component={<Link href="/eggs" />}>
          <Typography variant="body1" fontSize={14}>
            Egg Curve
          </Typography>
        </MenuItem>
        <MenuItem component={<Link href="/feeds" />}>
          <Typography variant="body1" fontSize={14}>
            HHEP
          </Typography>
        </MenuItem>
        <MenuItem component={<Link href="/feeds" />}>
          <Typography variant="body1" fontSize={14}>
            HDEP
          </Typography>
        </MenuItem>
      </Menu> */}
      <Menu menuItemStyles={menuItemStyles}>
        <MenuItem component={<Link href="/feeds" />}>
          <Typography variant="body1" fontSize={14}>
            Currencies
          </Typography>
        </MenuItem>
        <MenuItem component={<Link href="/feeds" />}>
          <Typography variant="body1" fontSize={14}>
            Countries
          </Typography>
        </MenuItem>
        <MenuItem component={<Link href="/feeds" />}>
          <Typography variant="body1" fontSize={14}>
            Cities
          </Typography>
        </MenuItem>
        <MenuItem component={<Link href="/feeds" />}>
          <Typography variant="body1" fontSize={14}>
            Regions
          </Typography>
        </MenuItem>
        <MenuItem component={<Link href="/notifications" />}>
          <Typography variant="body1" fontSize={14}>
            Notifications
          </Typography>
        </MenuItem>
        <MenuItem component={<Link href="/settings" />}>
          <Typography variant="body1" fontSize={14}>
            Setting
          </Typography>
        </MenuItem>
        <MenuItem component={<Link href="/api/logout" />}>
          <Typography variant="body1" fontSize={14}>
            Logout
          </Typography>
        </MenuItem>
        <SubMenu
          label={
            <Typography variant="body1" fontSize={14}>
              Get Help
            </Typography>
          }
          icon={<ScienceIcon fontSize="small" />}
        >
          <MenuItem component={<Link href="/flocks" />}>
            <Typography variant="body1" fontSize={14}>
              User Guide
            </Typography>
          </MenuItem>
          <MenuItem component={<Link href="/flocks/reduction" />}>
            <Typography variant="body1" fontSize={14}>
              Contact Us
            </Typography>
          </MenuItem>
        </SubMenu>
      </Menu>
    </Sidebar>
  );
};

export default SidebarMenu;
