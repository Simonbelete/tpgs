import React, { useEffect } from "react";
import {
  Typography,
  Box,
  Popover,
  Tooltip,
  IconButton,
  Badge,
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
  Skeleton,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
  usePopupState,
  bindTrigger,
  bindPopover,
} from "material-ui-popup-state/hooks";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  useGetUnreadCountQuery,
  useLazyGetUnreadListQuery,
  useMarkAllAsReadMutation,
} from "../services";
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
  const [markAsRead, markAsReadResult] = useMarkAllAsReadMutation();

  useEffect(() => {
    if (popupState.isOpen) trigger({ limit: 6 }, true);
  }, [popupState.isOpen]);

  useEffect(() => {
    if (markAsReadResult.isSuccess) trigger({ limit: 6 }, true);
  }, [markAsReadResult]);

  const markAllAsRead = async () => {
    const response = await markAsRead(null);
  };

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
        <Box sx={{ py: 2, pl: 2 }}>
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
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          </Stack>
          <Box
            sx={{ maxHeight: 300, overflowY: "scroll", overflowX: "hidden" }}
          >
            {isLoading && (
              <Stack direction={"column"} gap={2}>
                <Box sx={{ display: "flex" }} gap={2}>
                  <Skeleton variant="circular" width={50} height={50} />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "1rem" }}
                    width={"80%"}
                  />
                </Box>
                <Box sx={{ display: "flex" }} gap={2}>
                  <Skeleton variant="circular" width={50} height={50} />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "1rem" }}
                    width={"80%"}
                  />
                </Box>
                <Box sx={{ display: "flex" }} gap={2}>
                  <Skeleton variant="circular" width={50} height={50} />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "1rem" }}
                    width={"80%"}
                  />
                </Box>
                <Box sx={{ display: "flex" }} gap={2}>
                  <Skeleton variant="circular" width={50} height={50} />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "1rem" }}
                    width={"80%"}
                  />
                </Box>
              </Stack>
            )}
            {!isLoading &&
              data &&
              data.results.map((e, i) => (
                <List
                  key={i}
                  sx={{ width: "100%", maxWidth: 360 }}
                  onClick={() => router.push(`/notifications/${e.id}`)}
                >
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
