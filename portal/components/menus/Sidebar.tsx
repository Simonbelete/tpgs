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
import PublicIcon from "@mui/icons-material/Public";
import PaidIcon from "@mui/icons-material/Paid";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import HelpIcon from "@mui/icons-material/Help";
import { useSession, signOut } from "next-auth/react";
import hasGroup from "@/util/hasGroup";
import { useGroup } from "@/hooks";
import { ChickenIcon, DNAHellxIcon } from "@/components/Icons";
import DashboardIcon from '@mui/icons-material/Dashboard';
import EggIcon from '@mui/icons-material/Egg';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import CabinIcon from '@mui/icons-material/Cabin';

function menuProps(key: string) {
  return {
    id: `sidebar-menu-${key}`,
  }
}

const SidebarMenu = () => {
  const theme = useTheme();
  const { data: session, status } = useSession();
  const { isSuperUser, isAdmin, isFarmer} = useGroup();

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
      ['> svg']: {
        fill: sidebarTheme.menu.icon,
      },
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
      id="main-sidebar-menu"
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
        <MenuItem component={<Link href="/dashboard" />} icon={<DashboardIcon fontSize="small" />}>
            <Typography variant="body1" fontSize={14}>
              Dashboard
            </Typography>
          </MenuItem>
      { isSuperUser || isAdmin && (
        <SubMenu
          {...menuProps("users-main")}
          label={
            <Typography variant="body1" fontSize={14}>
              Users
            </Typography>
          }
          icon={<PeopleIcon fontSize="small" />}
        >
          <MenuItem component={<Link href="/users" />} icon={<AdjustIcon fontSize="small" />} {...menuProps("users")}>
            <Typography variant="body1" fontSize={14}>
              Users
            </Typography>
          </MenuItem>
            <MenuItem component={<Link href="/invitations" />} {...menuProps('invitations')} icon={<AdjustIcon fontSize="small" />}>
              <Typography variant="body1" fontSize={14}>
                Invitations
              </Typography>
            </MenuItem>
        </SubMenu>
        )}

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
      <div
        style={{ padding: "0 24px", marginBottom: "8px", marginTop: "32px" }}
      >
        <Typography
          variant="caption"
          fontWeight={500}
          style={{ opacity: 0.6, letterSpacing: "0.5px" }}
        >
          Breeding
        </Typography>
      </div>
      <Menu menuItemStyles={menuItemStyles}>
        <MenuItem
            component={<Link href="/chickens" />}
            icon={<ChickenIcon width="20" height="20" fill="inherit" />}
          >
            <Typography variant="body1" fontSize={14}>
              Chickens
            </Typography>
          </MenuItem>
          <SubMenu
          label={
            <Typography variant="body1" fontSize={14}>
              Flocks
            </Typography>
          }
          icon={<GroupWorkIcon width="20" height="20" fill="inherit" />}
        >
            <MenuItem
              component={<Link href="/flocks" />}
              icon={<AdjustIcon fontSize="small" />}
            >
              <Typography variant="body1" fontSize={14}>
                Flocks
              </Typography>
            </MenuItem>
            <MenuItem
              component={<Link href="/flocks/accusations" />}
              icon={<AdjustIcon fontSize="small" />}
            >
              <Typography variant="body1" fontSize={14}>
                Accusations
              </Typography>
            </MenuItem>
            <MenuItem
              component={<Link href="/flocks/reductions" />}
              icon={<AdjustIcon fontSize="small" />}
            >
              <Typography variant="body1" fontSize={14}>
                Reductions
              </Typography>
            </MenuItem>
          </SubMenu>
          <SubMenu
          label={
            <Typography variant="body1" fontSize={14}>
              Egg Production
            </Typography>
          }
          icon={<EggIcon />}
        >
            <MenuItem
              component={<Link href="/eggs" />}
              icon={<AdjustIcon fontSize="small" />}
            >
              <Typography variant="body1" fontSize={14}>
                Individual
              </Typography>
            </MenuItem>
            <MenuItem
              component={<Link href="/eggs/mass" />}
              icon={<AdjustIcon fontSize="small" />}
            >
              <Typography variant="body1" fontSize={14}>
                Mass
              </Typography>
            </MenuItem>
          </SubMenu>
          <MenuItem
              component={<Link href="/breeds" />}
              icon={<DNAHellxIcon width="20" height="20" fill="inherit" />}
            >
              <Typography variant="body1" fontSize={14}>
                Breeds
              </Typography>
            </MenuItem>
            <MenuItem
              component={<Link href="/houses" />}
              icon={<CabinIcon fontSize="small" />}
            >
              <Typography variant="body1" fontSize={14}>
                House
              </Typography>
            </MenuItem>
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
      <div
        style={{ padding: "0 24px", marginBottom: "8px", marginTop: "32px" }}
      >
        <Typography
          variant="caption"
          fontWeight={500}
          style={{ opacity: 0.6, letterSpacing: "0.5px" }}
        >
          Reporting
        </Typography>
      </div>
      <Menu menuItemStyles={menuItemStyles}>
      <SubMenu
          label={
            <Typography variant="body1" fontSize={14}>
              Eggs Reporting
            </Typography>
          }
          icon={<EggIcon fontSize="small" />}
        >
           <MenuItem component={<Link href="/breeds" />} icon={<AdjustIcon fontSize="small" />}>
          <Typography variant="body1" fontSize={14}>
            Egg Grading
          </Typography>
          </MenuItem>
          <MenuItem component={<Link href="/eggs" />} icon={<AdjustIcon fontSize="small" />}>
            <Typography variant="body1" fontSize={14}>
              Egg Curve
            </Typography>
          </MenuItem>
          <MenuItem component={<Link href="/hhep" />} icon={<AdjustIcon fontSize="small" />}>
            <Typography variant="body1" fontSize={14}>
              HHEP
            </Typography>
          </MenuItem>
          <MenuItem component={<Link href="/feeds" />} icon={<AdjustIcon fontSize="small" />}>
            <Typography variant="body1" fontSize={14}>
              HDEP
            </Typography>
          </MenuItem>
        </SubMenu>
        <MenuItem component={<Link href="/chickens" />} icon={<AdjustIcon fontSize="small" />}>
          <Typography variant="body1" fontSize={14}>
            Body Weight
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
          Settings
        </Typography>
      </div>
      <Menu menuItemStyles={menuItemStyles}>
        <MenuItem
          component={<Link href="/feeds" />}
          icon={<PaidIcon fontSize="small" />}
        >
          <Typography variant="body1" fontSize={14}>
            Currencies
          </Typography>
        </MenuItem>
        {/* Country */}
        <SubMenu
          label={
            <Typography variant="body1" fontSize={14}>
              Countries
            </Typography>
          }
          icon={<PublicIcon fontSize="small" />}
        >
          <MenuItem
            component={<Link href="/countries" />}
            icon={<AdjustIcon fontSize="small" />}
          >
            <Typography variant="body1" fontSize={14}>
              Countries
            </Typography>
          </MenuItem>
          <MenuItem
            component={<Link href="/cities" />}
            icon={<AdjustIcon fontSize="small" />}
          >
            <Typography variant="body1" fontSize={14}>
              Cities
            </Typography>
          </MenuItem>
          <MenuItem
            component={<Link href="/flocks/reduction" />}
            icon={<AdjustIcon fontSize="small" />}
          >
            <Typography variant="body1" fontSize={14}>
              Regions
            </Typography>
          </MenuItem>
        </SubMenu>

        <MenuItem
          component={<Link href="/notifications" />}
          icon={<NotificationsIcon fontSize="small" />}
        >
          <Typography variant="body1" fontSize={14}>
            Notifications
          </Typography>
        </MenuItem>
        <MenuItem
          component={<Link href="/setting" />}
          icon={<SettingsIcon fontSize="small" />}
        >
          <Typography variant="body1" fontSize={14}>
            Setting
          </Typography>
        </MenuItem>
        <MenuItem
          component={<Link href="/api/logout" />}
          icon={<LogoutIcon fontSize="small" />}
        >
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
          icon={<HelpIcon fontSize="small" />}
        >
          <MenuItem component={<Link href="/help" />} icon={<AdjustIcon fontSize="small" />}>
            <Typography variant="body1" fontSize={14}>
              User Guide
            </Typography>
          </MenuItem>
          <MenuItem component={<Link href="/flocks/reduction" />} icon={<AdjustIcon fontSize="small" />}>
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
