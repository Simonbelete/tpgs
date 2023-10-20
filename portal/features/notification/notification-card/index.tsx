import { Shadow, StatisticsCard } from "@/components";
import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
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
  Skeleton,
} from "@mui/material";
import { Notification } from "@/models";
import { useGetUnreadListQuery, useMarkAllAsReadMutation } from "../services";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import WarningIcon from "@mui/icons-material/Warning";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const NotificationCard = () => {
  const { data, isLoading, refetch } = useGetUnreadListQuery({ limit: 0 });
  const [markAsRead, markAsReadResult] = useMarkAllAsReadMutation();

  useEffect(() => {
    if (markAsReadResult.isSuccess) refetch();
  }, [markAsReadResult]);

  const markAllAsRead = async () => {
    const response = await markAsRead(null);
  };

  return (
    <StatisticsCard>
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
        <Box sx={{ maxHeight: 400, overflowY: "scroll", overflowX: "hidden" }}>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
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
          </List>
        </Box>
      </Box>
    </StatisticsCard>
  );
};

export default NotificationCard;
