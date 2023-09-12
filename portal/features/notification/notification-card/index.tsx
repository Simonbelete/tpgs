import { Shadow, StatisticsCard } from "@/components";
import React, { useState } from "react";
import { List, ListItem, Box, ListItemAvatar, ListItemText, Avatar, Typography, Divider } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import { Notification } from '@/models';

const NotificationCard = () => {
  const [data, setData] = useState<Notification[]>([{id: 1}, {id: 2}]);

  return (
    <StatisticsCard title="Notifications">
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {data.map((e) => (
            <>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" />
              </ListItemAvatar>
              <ListItemText
                primary="Brunch this weekend?"
                secondary={
                  <React.Fragment>
                    <Typography variant="caption" display={"flex"}>
                      10 Min ago
                    </Typography>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Ali Connors
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            </>
          ))}
        </List>
    </StatisticsCard>
  )
}

export default NotificationCard;