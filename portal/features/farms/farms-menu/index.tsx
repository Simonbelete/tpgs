import React, { useEffect, useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  Popper,
  Paper,
  Grow,
  ClickAwayListener,
  MenuList,
  ListItemText,
  Divider,
  ListItemIcon,
  Typography,
  IconButton,
} from "@mui/material";
import { Farm } from "@/models";
import farm_service from "../services/farm_service";
import WindowIcon from "@mui/icons-material/Window";
import HouseIcon from "@mui/icons-material/House";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { setTenant } from "../slices";
import { RootState } from "@/store";

const FarmsMenu = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const tenant = useSelector((state: RootState) => state.tenant);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [farms, setFarms] = useState<Farm[]>([]);

  useEffect(() => {
    if (open && farms.length == 0) {
      farm_service
        .get({ limit: 5 })
        .then((response) => {
          if (response.status == 200) setFarms(response.data.results);
        })
        .catch((ex) => {});
    }
  }, [open]);

  return (
    <>
      <Button
        id="farms-menu"
        aria-controls={open ? "farms-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        disableRipple
        size="small"
        startIcon={<HouseIcon />}
        endIcon={<ArrowDropDownIcon />}
        color="secondary"
        sx={{ padding: 0, mr: 1 }}
      >
        <Typography variant="caption" color="text.primary">
          {tenant.name}
        </Typography>
      </Button>
      <Popper
        id="farms-menu-popover"
        open={open}
        anchorEl={anchorEl}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        sx={{ zIndex: 999 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper elevation={16}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                >
                  {farms.map((e, key) => (
                    <MenuItem
                      key={key}
                      onClick={() => {
                        dispatch(setTenant(e));
                        router.reload();
                      }}
                    >
                      <ListItemIcon>
                        <HouseIcon />
                      </ListItemIcon>
                      <ListItemText>{e.name}</ListItemText>
                    </MenuItem>
                  ))}
                  <Divider />
                  <Link href="/farms">
                    <MenuItem>
                      <ListItemIcon>
                        <WindowIcon />
                      </ListItemIcon>
                      <ListItemText>Manage Farms</ListItemText>
                    </MenuItem>
                  </Link>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default FarmsMenu;
