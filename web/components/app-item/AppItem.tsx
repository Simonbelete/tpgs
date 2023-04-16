import React, { ReactElement } from "react";
import {
  Paper,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";

const AppItem = (): ReactElement => {
  return (
    <ListItem sx={{ background: "red" }}>
      <ListItemAvatar>
        <Avatar></Avatar>
      </ListItemAvatar>
      <ListItemText primary="Text" secondary="secondary" />
    </ListItem>
  );
};

export default AppItem;
