import React from "react";
import { Typography, Button, Popover, Tooltip, IconButton, Badge,
Drawer
} from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {
  usePopupState,
  bindTrigger,
  bindPopover,
} from 'material-ui-popup-state/hooks';
import NotificationsIcon from '@mui/icons-material/Notifications';

const NotificationPopover = () => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoPopover',
  })

  return (
    <div>
      <Tooltip title={"0 Notifications"}>
        <IconButton {...bindTrigger(popupState)}>
            <Badge
                badgeContent={0}
                color="error"
            >
                <NotificationsIcon />
            </Badge>
        </IconButton>
      </Tooltip>
      <Popover
        {...bindPopover(popupState)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography>
          The content of the Popover.
        </Typography>
      </Popover>
    </div>
  )
}

export default NotificationPopover;