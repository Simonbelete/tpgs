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
  Box,
  Stack,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { Farm } from "@/models";
import farm_service from "../services/farm_service";
import WindowIcon from "@mui/icons-material/Window";
import HouseIcon from "@mui/icons-material/House";
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
    farm_service
      .get({ limit: 5 })
      .then((response) => {
        if (response.status == 200) setFarms(response.data.results);
      })
      .catch((ex) => {});
  }, []);

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        disableRipple
        startIcon={<HouseIcon />}
      >
        <Typography variant="caption">{tenant.name}</Typography>
      </Button>
      <Popper
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
                  {/* <List
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                      bgcolor: "background.paper",
                    }}
                  >
                    {farms.map((e, key) => (
                      <ListItem key={key}>
                        <ListItemAvatar>
                          <HouseIcon />
                        </ListItemAvatar>
                        <ListItemText primary={e.name} />
                      </ListItem>
                    ))}
                  </List> */}
                  {farms.map((e, key) => (
                    <MenuItem
                      key={key}
                      onClick={() => {
                        dispatch(setTenant(e.name));
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
