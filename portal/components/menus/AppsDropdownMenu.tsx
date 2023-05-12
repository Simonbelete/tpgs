import React from "react";
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
} from "@mui/material";

const PrimaryMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        disableRipple
      >
        Apps
      </Button>
      <Popper
        open={open}
        anchorEl={anchorEl}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
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
                  <List
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                      bgcolor: "background.paper",
                    }}
                  >
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar></Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar></Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Work" secondary="Jan 7, 2014" />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar></Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Vacation"
                        secondary="July 20, 2014"
                      />
                    </ListItem>
                  </List>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default PrimaryMenu;
