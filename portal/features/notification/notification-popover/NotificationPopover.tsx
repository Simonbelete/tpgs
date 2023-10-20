import React, { useEffect } from "react";
import {
  Typography,
  Box,
  Popover,
  Tooltip,
  IconButton,
  Badge,
  Drawer,
  Grid,
  Stack,
  List,
  ListItem,
  Divider,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
  ListItemButton,
  ListItemIcon,
  CircularProgress,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
  usePopupState,
  bindTrigger,
  bindPopover,
} from "material-ui-popup-state/hooks";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useGetUnreadCountQuery, useLazyGetUnreadListQuery } from "../services";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import WarningIcon from "@mui/icons-material/Warning";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from "next/router";
import Link from "next/link";

dayjs.extend(relativeTime);

const NotificationPopover = () => {
  const router = useRouter();
  const popupState = usePopupState({
    variant: "popover",
    popupId: "demoPopover",
  });

  const { data: countData, refetch } = useGetUnreadCountQuery(null);
  const [trigger, { isLoading, data }, lastPromiseInfo] =
    useLazyGetUnreadListQuery();

  useEffect(() => {
    if (popupState.isOpen) trigger({ limit: 6 }, false);
  }, [popupState.isOpen]);

  return (
    <div>
      <Tooltip title={"0 Notifications"}>
        <IconButton {...bindTrigger(popupState)}>
          <Badge badgeContent={countData?.unread_count || 0} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <Popover
        {...bindPopover(popupState)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box sx={{ px: 2, pl: 2 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Typography variant="body1" fontWeight={600} color="text.primary">
              Notifications
            </Typography>
            <Button
              size="small"
              startIcon={<DoneAllIcon fontSize="small" />}
              variant="text"
            >
              Mark all as read
            </Button>
          </Stack>
          <Box
            sx={{ maxHeight: 300, overflowY: "scroll", overflowX: "hidden" }}
          >
            {isLoading && <CircularProgress />}
            {!isLoading &&
              data &&
              data.results.map((e, i) => (
                <List key={i} sx={{ width: "100%", maxWidth: 360 }}>
                  <ListItem disablePadding>
                    <ListItemButton sx={{ p: 0 }}>
                      <ListItemIcon>
                        <Avatar sx={{ bgcolor: "#ff9800" }}>
                          {e.level == "success" && (
                            <CheckCircleIcon fontSize="small" />
                          )}
                          {e.level == "info" && <InfoIcon fontSize="small" />}
                          {e.level == "warning" && (
                            <WarningIcon fontSize="small" />
                          )}
                          {e.level == "error" && <ErrorIcon fontSize="small" />}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={e.verb}
                        secondary={
                          <React.Fragment>
                            <Typography variant="caption" display={"flex"}>
                              {dayjs(e.timestamp).fromNow()}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider component="li" />
                </List>
              ))}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Divider />
            <Link href={"/notifications"}>
              <Button variant="text" fullWidth color="secondary">
                View all
              </Button>
            </Link>
          </Box>
        </Box>
      </Popover>
    </div>
  );
};

export default NotificationPopover;
