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
import BalanceIcon from "@mui/icons-material/Balance";
import ScienceIcon from "@mui/icons-material/Science";
import PeopleIcon from "@mui/icons-material/People";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import AdjustIcon from "@mui/icons-material/Adjust";
import ScaleIcon from "@mui/icons-material/Scale";
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
import {
  ChickenIcon,
  DNAHellxIcon,
  SackIcon,
  FlourBagIcon,
  ChickenEasterIcon,
} from "@/components/Icons";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EggIcon from "@mui/icons-material/Egg";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import CabinIcon from "@mui/icons-material/Cabin";
import { useRouter } from "next/router";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FactoryIcon from "@mui/icons-material/Factory";
import ChecklistIcon from "@mui/icons-material/Checklist";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { useProSidebar } from "react-pro-sidebar";
import ViewTimelineIcon from "@mui/icons-material/ViewTimeline";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import PinIcon from "@mui/icons-material/Pin";
import RuleIcon from "@mui/icons-material/Rule";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import TimelineIcon from "@mui/icons-material/Timeline";

function menuProps(key: string) {
  return {
    id: `sidebar-menu-${key}`,
  };
}

const SidebarMenu = () => {
  const theme = useTheme();
  const router = useRouter();
  const { data: session, status } = useSession();
  const { isSuperUser, isAdmin, isFarmer } = useGroup();

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
      active: {
        backgroundColor: "#365966",
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
      ["> svg"]: {
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
      [`&.${menuClasses.active}`]: {
        backgroundColor: sidebarTheme.menu.active.backgroundColor,
        color: sidebarTheme.menu.active.color,
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
  const handleSignOut = async () => {
    await signOut();
  };

  const { collapseSidebar, toggleSidebar } = useProSidebar();
  const tenant = useSelector((state: RootState) => state.tenant);

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
          <Link onClick={() => toggleSidebar()} href="/">
            <img src="/images/logo_full.png" alt="" height={35} />
          </Link>
        </Grid>
      </Grid>
      <Box my={1}>
        <Divider />
      </Box>

      <Menu menuItemStyles={menuItemStyles}>
        <MenuItem
          component={<Link onClick={() => toggleSidebar()} href="/dashboard" />}
          icon={<DashboardIcon fontSize="small" />}
          active={RegExp("^/dashboard(.*)$").test(router.pathname)}
        >
          <Typography variant="body1" fontSize={14}>
            Dashboard
          </Typography>
        </MenuItem>
        {(isSuperUser || isAdmin) && (
          <SubMenu
            {...menuProps("users-main")}
            label={
              <Typography variant="body1" fontSize={14}>
                Users
              </Typography>
            }
            icon={<PeopleIcon fontSize="small" />}
            defaultOpen={RegExp("^/(users|invitations|groups)(.*)$").test(
              router.pathname
            )}
          >
            <MenuItem
              component={<Link onClick={() => toggleSidebar()} href="/users" />}
              icon={<AdjustIcon fontSize="small" />}
              {...menuProps("users")}
              active={RegExp("/users(.*)$").test(router.pathname)}
            >
              <Typography variant="body1" fontSize={14}>
                Users
              </Typography>
            </MenuItem>
            <MenuItem
              component={
                <Link onClick={() => toggleSidebar()} href="/invitations" />
              }
              {...menuProps("invitations")}
              icon={<AdjustIcon fontSize="small" />}
              active={RegExp("/invitations(.*)$").test(router.pathname)}
            >
              <Typography variant="body1" fontSize={14}>
                Invitations
              </Typography>
            </MenuItem>
            <MenuItem
              component={
                <Link onClick={() => toggleSidebar()} href="/groups" />
              }
              icon={<AdjustIcon fontSize="small" />}
              {...menuProps("groups")}
              active={RegExp("/groups(.*)$").test(router.pathname)}
            >
              <Typography variant="body1" fontSize={14}>
                Groups
              </Typography>
            </MenuItem>
          </SubMenu>
        )}

        <MenuItem
          component={<Link onClick={() => toggleSidebar()} href="/farms" />}
          icon={<FactoryIcon fontSize="small" />}
          active={RegExp("/farms(.*)$").test(router.pathname)}
        >
          <Typography variant="body1" fontSize={14}>
            Farms
          </Typography>
        </MenuItem>

        <SubMenu
          label={
            <Typography variant="body1" fontSize={14}>
              Units
            </Typography>
          }
          icon={<BalanceIcon fontSize="small" />}
        >
          <MenuItem
            component={<Link onClick={() => toggleSidebar()} href="/units" />}
            active={RegExp("/units(.*)$").test(router.pathname)}
          >
            <Typography variant="body1" fontSize={14}>
              Units
            </Typography>
          </MenuItem>
          {/* <MenuItem component={<Link onClick={() => toggleSidebar()} href="/unit-converters" />}>
            <Typography variant="body1" fontSize={14}>
              Units Convertor
            </Typography>
          </MenuItem> */}
        </SubMenu>
        <MenuItem
          component={<Link onClick={() => toggleSidebar()} href="/purposes" />}
          icon={<CrisisAlertIcon fontSize="small" />}
          active={RegExp("/purposes(.*)$").test(router.pathname)}
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
          defaultOpen={RegExp(
            "^/(formulation/experimental|formulation/formulas)(.*)$"
          ).test(router.pathname)}
        >
          <MenuItem
            component={
              <Link
                onClick={() => toggleSidebar()}
                href="/formulation/formulas"
              />
            }
            active={RegExp("/formulation/formulas(.*)$").test(router.pathname)}
          >
            <Typography variant="body1" fontSize={14}>
              Formula
            </Typography>
          </MenuItem>
          <MenuItem
            component={
              <Link
                onClick={() => toggleSidebar()}
                href="/formulation/experimental"
              />
            }
            active={RegExp("/formulation/experimental(.*)$").test(
              router.pathname
            )}
          >
            <Typography variant="body1" fontSize={14}>
              New Formula
            </Typography>
          </MenuItem>
        </SubMenu>
        <MenuItem
          component={
            <Link onClick={() => toggleSidebar()} href="/ingredients" />
          }
          icon={<LocalDiningIcon fontSize="small" />}
          active={RegExp("/ingredients(.*)$").test(router.pathname)}
        >
          <Typography variant="body1" fontSize={14}>
            Ingredients
          </Typography>
        </MenuItem>
        <MenuItem
          component={<Link onClick={() => toggleSidebar()} href="/nutrients" />}
          icon={<BubbleChartIcon fontSize="small" />}
          active={RegExp("/nutrients(.*)$").test(router.pathname)}
        >
          <Typography variant="body1" fontSize={14}>
            Nutrients
          </Typography>
        </MenuItem>
        <MenuItem
          component={
            <Link onClick={() => toggleSidebar()} href="/requirements" />
          }
          icon={<ChecklistIcon fontSize="small" />}
          active={RegExp("^/requirements(.*)$").test(router.pathname)}
        >
          <Typography variant="body1" fontSize={14}>
            Requirements
          </Typography>
        </MenuItem>
        <SubMenu
          label={
            <Typography variant="body1" fontSize={14}>
              Groups
            </Typography>
          }
          icon={<GroupWorkIcon fontSize="small" />}
          defaultOpen={RegExp("^/(nutrient-groups|ingredient-types)(.*)$").test(
            router.pathname
          )}
        >
          <MenuItem
            component={
              <Link onClick={() => toggleSidebar()} href="/ingredient-types" />
            }
            icon={<AdjustIcon fontSize="small" />}
            active={RegExp("/ingredient-types(.*)$").test(router.pathname)}
          >
            <Typography variant="body1" fontSize={14}>
              Ingredient Group
            </Typography>
          </MenuItem>
          <MenuItem
            component={
              <Link onClick={() => toggleSidebar()} href="/nutrient-groups" />
            }
            icon={<AdjustIcon fontSize="small" />}
            active={RegExp("^/nutrient-groups(.*)$").test(router.pathname)}
          >
            <Typography variant="body1" fontSize={14}>
              Nutrient Group
            </Typography>
          </MenuItem>
        </SubMenu>
      </Menu>
      {tenant.name != "public" ? (
        <>
          <div
            style={{
              padding: "0 24px",
              marginBottom: "8px",
              marginTop: "32px",
            }}
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
            <SubMenu
              label={
                <Typography variant="body1" fontSize={14}>
                  Chicken
                </Typography>
              }
              icon={<ChickenIcon width="20" height="20" fill="inherit" />}
              defaultOpen={RegExp(
                "^/(chickens|chicken-grid|chickens/export)(.*)$"
              ).test(router.pathname)}
            >
              <MenuItem
                component={
                  <Link onClick={() => toggleSidebar()} href="/chickens" />
                }
                icon={<AdjustIcon fontSize="small" />}
                active={RegExp("^/chickens(.*)$").test(router.pathname)}
              >
                <Typography variant="body1" fontSize={14}>
                  View/Edit Chickens
                </Typography>
              </MenuItem>
              <MenuItem
                component={
                  <Link
                    onClick={() => toggleSidebar()}
                    href="/chickens/create"
                  />
                }
                icon={<AdjustIcon fontSize="small" />}
                active={RegExp("^/chickens/create$").test(router.pathname)}
              >
                <Typography variant="body1" fontSize={14}>
                  Create Chicken
                </Typography>
              </MenuItem>
              <MenuItem
                component={
                  <Link onClick={() => toggleSidebar()} href="/chicken-grid" />
                }
                icon={<AdjustIcon fontSize="small" />}
                active={RegExp("^/chicken-grid(.*)$").test(router.pathname)}
              >
                <Typography variant="body1" fontSize={14}>
                  Grid Chicken
                </Typography>
              </MenuItem>
              <MenuItem
                component={
                  <Link
                    onClick={() => toggleSidebar()}
                    href="/chickens/export"
                  />
                }
                icon={<AdjustIcon fontSize="small" />}
                active={RegExp("^/chickens/export(.*)$").test(router.pathname)}
              >
                <Typography variant="body1" fontSize={14}>
                  Export Chickens
                </Typography>
              </MenuItem>
              <MenuItem
                component={
                  <Link onClick={() => toggleSidebar()} href="/chickens/cull" />
                }
                icon={<AdjustIcon fontSize="small" />}
                active={RegExp("^/chickens/cull(.*)$").test(router.pathname)}
              >
                <Typography variant="body1" fontSize={14}>
                  Cull Chicken
                </Typography>
              </MenuItem>
            </SubMenu>
            <MenuItem
              component={
                <Link onClick={() => toggleSidebar()} href="/pedigree" />
              }
              icon={<AccountTreeIcon width="20" height="20" fill="inherit" />}
            >
              <Typography variant="body1" fontSize={14}>
                Pedigree
              </Typography>
            </MenuItem>
            <SubMenu
              label={
                <Typography variant="body1" fontSize={14}>
                  Hatch
                </Typography>
              }
              icon={<ChickenEasterIcon width="20" height="20" fill="inherit" />}
              defaultOpen={RegExp("^/(hatchery|candling|incubation)(.*)$").test(
                router.pathname
              )}
            >
              <MenuItem
                component={
                  <Link onClick={() => toggleSidebar()} href="/hatchery" />
                }
                icon={<AdjustIcon fontSize="small" />}
                active={RegExp("^/hatchery(.*)$").test(router.pathname)}
              >
                <Typography variant="body1" fontSize={14}>
                  Hatch
                </Typography>
              </MenuItem>
              <MenuItem
                component={
                  <Link onClick={() => toggleSidebar()} href="/candling" />
                }
                icon={<AdjustIcon fontSize="small" />}
                active={RegExp("^/candling(.*)$").test(router.pathname)}
              >
                <Typography variant="body1" fontSize={14}>
                  Candling
                </Typography>
              </MenuItem>
              <MenuItem
                component={
                  <Link onClick={() => toggleSidebar()} href="/incubation" />
                }
                icon={<AdjustIcon fontSize="small" />}
                active={RegExp("^/incubation(.*)$").test(router.pathname)}
              >
                <Typography variant="body1" fontSize={14}>
                  Incubation
                </Typography>
              </MenuItem>
            </SubMenu>
            <MenuItem
              component={<Link onClick={() => toggleSidebar()} href="/eggs" />}
              icon={<EggIcon fontSize="small" />}
              active={RegExp("^/eggs$").test(router.pathname)}
            >
              <Typography variant="body1" fontSize={14}>
                Egg Production
              </Typography>
            </MenuItem>
            <SubMenu
              label={
                <Typography variant="body1" fontSize={14}>
                  Feed Intake
                </Typography>
              }
              icon={<SackIcon width="20" height="20" fill="inherit" />}
              defaultOpen={RegExp("^/feeds(.*)$").test(router.pathname)}
            >
              <MenuItem
                component={
                  <Link onClick={() => toggleSidebar()} href="/feeds" />
                }
                icon={<AdjustIcon fontSize="small" />}
                active={RegExp("^/feeds$").test(router.pathname)}
              >
                <Typography variant="body1" fontSize={14}>
                  Individual
                </Typography>
              </MenuItem>
              <MenuItem
                component={
                  <Link onClick={() => toggleSidebar()} href="/feeds/batch" />
                }
                icon={<AdjustIcon fontSize="small" />}
                active={RegExp("^/feeds/batch(.*)$").test(router.pathname)}
              >
                <Typography variant="body1" fontSize={14}>
                  Batch
                </Typography>
              </MenuItem>
            </SubMenu>
            <MenuItem
              component={
                <Link onClick={() => toggleSidebar()} href="/weights" />
              }
              icon={<ScaleIcon width="20" height="20" fill="inherit" />}
              active={RegExp("^/weights$").test(router.pathname)}
            >
              <Typography variant="body1" fontSize={14}>
                Body Weight
              </Typography>
            </MenuItem>
            <MenuItem
              component={
                <Link onClick={() => toggleSidebar()} href="/breeds" />
              }
              icon={<DNAHellxIcon width="20" height="20" fill="inherit" />}
              active={RegExp("^/breeds$").test(router.pathname)}
            >
              <Typography variant="body1" fontSize={14}>
                Breeds
              </Typography>
            </MenuItem>
            <SubMenu
              label={
                <Typography variant="body1" fontSize={14}>
                  House
                </Typography>
              }
              icon={<CabinIcon fontSize="small" />}
              defaultOpen={RegExp("^/(pen|houses)(.*)$").test(router.pathname)}
            >
              <MenuItem
                component={
                  <Link onClick={() => toggleSidebar()} href="/houses" />
                }
                icon={<AdjustIcon fontSize="small" />}
                active={RegExp("^/houses(.*)$").test(router.pathname)}
              >
                <Typography variant="body1" fontSize={14}>
                  House
                </Typography>
              </MenuItem>
              <MenuItem
                component={<Link onClick={() => toggleSidebar()} href="/pen" />}
                icon={<AdjustIcon fontSize="small" />}
                active={RegExp("^/pen(.*)$").test(router.pathname)}
              >
                <Typography variant="body1" fontSize={14}>
                  Pen
                </Typography>
              </MenuItem>
            </SubMenu>
            <SubMenu
              label={
                <Typography variant="body1" fontSize={14}>
                  Guidelines
                </Typography>
              }
              icon={<AssignmentTurnedInIcon fontSize="small" />}
              defaultOpen={RegExp(
                "^/(guidelines/hdep|guidelines/weight|guidelines/feed|guidelines/eggs)(.*)$"
              ).test(router.pathname)}
            >
              <MenuItem
                component={
                  <Link
                    onClick={() => toggleSidebar()}
                    href="/guidelines/hdep"
                  />
                }
                icon={<AdjustIcon fontSize="small" />}
                active={RegExp("^/guidelines/hdep(.*)$").test(router.pathname)}
              >
                <Typography variant="body1" fontSize={14}>
                  HDEP Guideline
                </Typography>
              </MenuItem>
              <MenuItem
                component={
                  <Link
                    onClick={() => toggleSidebar()}
                    href="/guidelines/hhep"
                  />
                }
                icon={<AdjustIcon fontSize="small" />}
                active={RegExp("^/guidelines/hhep(.*)$").test(router.pathname)}
              >
                <Typography variant="body1" fontSize={14}>
                  HHEP Guideline
                </Typography>
              </MenuItem>
              <MenuItem
                component={
                  <Link
                    onClick={() => toggleSidebar()}
                    href="/guidelines/weight"
                  />
                }
                icon={<AdjustIcon fontSize="small" />}
                active={RegExp("^/guidelines/weight(.*)$").test(
                  router.pathname
                )}
              >
                <Typography variant="body1" fontSize={14}>
                  Weight Guideline
                </Typography>
              </MenuItem>
              <MenuItem
                component={
                  <Link
                    onClick={() => toggleSidebar()}
                    href="/guidelines/feed"
                  />
                }
                icon={<AdjustIcon fontSize="small" />}
                active={RegExp("^/guidelines/feed(.*)$").test(router.pathname)}
              >
                <Typography variant="body1" fontSize={14}>
                  Feed Guideline
                </Typography>
              </MenuItem>
              <MenuItem
                component={
                  <Link
                    onClick={() => toggleSidebar()}
                    href="/guidelines/egg"
                  />
                }
                icon={<AdjustIcon fontSize="small" />}
                active={RegExp("^/guidelines/egg(.*)$").test(router.pathname)}
              >
                <Typography variant="body1" fontSize={14}>
                  Egg Guideline
                </Typography>
              </MenuItem>
            </SubMenu>
            <MenuItem
              component={
                <Link onClick={() => toggleSidebar()} href="/stages" />
              }
              icon={<PinIcon width="20" height="20" fill="inherit" />}
              active={RegExp("^/stages$").test(router.pathname)}
            >
              <Typography variant="body1" fontSize={14}>
                Stages
              </Typography>
            </MenuItem>
            <MenuItem
              component={
                <Link
                  onClick={() => toggleSidebar()}
                  href="/selections/create"
                />
              }
              icon={<RuleIcon width="20" height="20" fill="inherit" />}
              active={RegExp("^/selections$").test(router.pathname)}
            >
              <Typography variant="body1" fontSize={14}>
                Selection
              </Typography>
            </MenuItem>
          </Menu>
        </>
      ) : (
        <>
          <div
            style={{
              padding: "0 24px",
              marginBottom: "8px",
              marginTop: "32px",
            }}
          >
            <Link href="/farms">
              <Typography
                variant="caption"
                fontWeight={500}
                style={{ opacity: 0.6, letterSpacing: "0.5px", color: "#fff" }}
              >
                Switch Farm to use breeding datas
              </Typography>
            </Link>
          </div>
        </>
      )}
      <div
        style={{
          padding: "0 24px",
          marginBottom: "8px",
          marginTop: "32px",
        }}
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
        <MenuItem
          component={<Link onClick={() => toggleSidebar()} href="/reports" />}
          icon={<AutoGraphIcon fontSize="small" />}
          active={RegExp("/reports(.*)$").test(router.pathname)}
        >
          <Typography variant="body1" fontSize={14}>
            Reports
          </Typography>
        </MenuItem>

        <MenuItem
          component={
            <Link onClick={() => toggleSidebar()} href="/import-job" />
          }
          icon={<FileUploadIcon fontSize="small" />}
          active={RegExp("/import-job(.*)$").test(router.pathname)}
        >
          <Typography variant="body1" fontSize={14}>
            Import
          </Typography>
        </MenuItem>
        <MenuItem
          component={
            <Link onClick={() => toggleSidebar()} href="/export-job" />
          }
          icon={<FileDownloadIcon fontSize="small" />}
          active={RegExp("/export-job(.*)$").test(router.pathname)}
        >
          <Typography variant="body1" fontSize={14}>
            Export
          </Typography>
        </MenuItem>

        {(isSuperUser || isAdmin) && (
          <MenuItem
            component={
              <Link onClick={() => toggleSidebar()} href="/activities" />
            }
            icon={<TimelineIcon fontSize="small" />}
            active={RegExp("/activities(.*)$").test(router.pathname)}
          >
            <Typography variant="body1" fontSize={14}>
              Activities
            </Typography>
          </MenuItem>
        )}
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
        <SubMenu
          label={
            <Typography variant="body1" fontSize={14}>
              Others
            </Typography>
          }
          icon={<MoreHorizIcon fontSize="small" />}
          defaultOpen={RegExp("^/(reduction-reasons)(.*)$").test(
            router.pathname
          )}
        >
          <MenuItem
            component={
              <Link onClick={() => toggleSidebar()} href="/reduction-reasons" />
            }
            icon={<AdjustIcon fontSize="small" />}
            active={RegExp("/reduction-reasons(.*)$").test(router.pathname)}
          >
            <Typography variant="body1" fontSize={14}>
              Cull reasons
            </Typography>
          </MenuItem>
          <MenuItem
            component={
              <Link
                onClick={() => toggleSidebar()}
                href="/ingredient-nutrients"
              />
            }
            icon={<AdjustIcon fontSize="small" />}
            active={RegExp("/ingredient-nutrients(.*)$").test(router.pathname)}
          >
            <Typography variant="body1" fontSize={14}>
              Ingredient
              <br /> Composition
            </Typography>
          </MenuItem>
          <MenuItem
            component={
              <Link
                onClick={() => toggleSidebar()}
                href="/requirement-nutrients"
              />
            }
            icon={<AdjustIcon fontSize="small" />}
            active={RegExp("^/requirement-nutrients(.*)$").test(
              router.pathname
            )}
          >
            <Typography variant="body1" fontSize={14}>
              Requirement <br /> Composition
            </Typography>
          </MenuItem>
          <MenuItem
            component={
              <Link
                onClick={() => toggleSidebar()}
                href="/requirement-ingredients"
              />
            }
            icon={<AdjustIcon fontSize="small" />}
            active={RegExp("^/requirement-ingredients(.*)$").test(
              router.pathname
            )}
          >
            <Typography variant="body1" fontSize={14}>
              Requirement <br /> Min & Max
            </Typography>
          </MenuItem>
        </SubMenu>
        <MenuItem
          component={
            <Link onClick={() => toggleSidebar()} href="/currencies" />
          }
          icon={<PaidIcon fontSize="small" />}
          active={RegExp("/currencies(.*)$").test(router.pathname)}
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
          defaultOpen={RegExp("^/(countries|cities|regions)(.*)$").test(
            router.pathname
          )}
        >
          <MenuItem
            component={
              <Link onClick={() => toggleSidebar()} href="/countries" />
            }
            icon={<AdjustIcon fontSize="small" />}
            active={RegExp("/countries(.*)$").test(router.pathname)}
          >
            <Typography variant="body1" fontSize={14}>
              Countries
            </Typography>
          </MenuItem>
          <MenuItem
            component={<Link onClick={() => toggleSidebar()} href="/cities" />}
            icon={<AdjustIcon fontSize="small" />}
            active={RegExp("/cities(.*)$").test(router.pathname)}
          >
            <Typography variant="body1" fontSize={14}>
              Cities
            </Typography>
          </MenuItem>
          <MenuItem
            component={<Link onClick={() => toggleSidebar()} href="/regions" />}
            icon={<AdjustIcon fontSize="small" />}
            active={RegExp("/regions(.*)$").test(router.pathname)}
          >
            <Typography variant="body1" fontSize={14}>
              Regions
            </Typography>
          </MenuItem>
        </SubMenu>

        <MenuItem
          component={
            <Link onClick={() => toggleSidebar()} href="/notifications" />
          }
          icon={<NotificationsIcon fontSize="small" />}
          active={RegExp("^/notifications(.*)$").test(router.pathname)}
        >
          <Typography variant="body1" fontSize={14}>
            Notifications
          </Typography>
        </MenuItem>
        <MenuItem
          component={<Link onClick={() => toggleSidebar()} href="/settings" />}
          icon={<SettingsIcon fontSize="small" />}
          active={RegExp("^/settings(.*)$").test(router.pathname)}
        >
          <Typography variant="body1" fontSize={14}>
            Setting
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={handleSignOut}
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
          <MenuItem
            component={<Link onClick={() => toggleSidebar()} href="/help" />}
            icon={<AdjustIcon fontSize="small" />}
          >
            <Typography variant="body1" fontSize={14}>
              User Guide
            </Typography>
          </MenuItem>
          <MenuItem
            component={
              <Link onClick={() => toggleSidebar()} href="/flocks/reduction" />
            }
            icon={<AdjustIcon fontSize="small" />}
          >
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
