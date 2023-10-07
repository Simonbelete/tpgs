import React, { useEffect } from "react";
import { Typography, Box, Popover, Tooltip, IconButton, Badge,
Drawer, Grid
} from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {
  usePopupState,
  bindTrigger,
  bindPopover,
} from 'material-ui-popup-state/hooks';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useGetUnreadCountQuery, useLazyGetUnreadListQuery } from '../services';

const NotificationPopover = () => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoPopover',
  });

  const { data: countData, refetch } = useGetUnreadCountQuery(null);
  const [trigger, {isLoading, data}, lastPromiseInfo] = useLazyGetUnreadListQuery();

  useEffect(() => {
    if(popupState.isOpen) trigger(null, false);
  }, [popupState.isOpen])

  return (
    <div>
      <Tooltip title={"0 Notifications"}>
        <IconButton {...bindTrigger(popupState)}>
            <Badge
                badgeContent={countData?.unread_count || 0}
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
       <Box>
          <Grid>
            <Typography variant="body1" fontWeight={600} color="text.primary">
              Notifications
            </Typography>
          </Grid>
          
       </Box>
      </Popover>
    </div>
  )
}

export default NotificationPopover;