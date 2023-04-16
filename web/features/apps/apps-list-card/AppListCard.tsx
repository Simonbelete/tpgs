import React, { ReactElement } from "react";
import { Card, CardContent, CardHeader, Typography, List } from "@mui/material";
import { AppItem } from "@/components";

const AppListCard = (): ReactElement => {
  return (
    <Card variant="outlined">
      <CardHeader>
        <Typography variant="h5">Applications</Typography>
      </CardHeader>
      <CardContent>
        <List>
          <AppItem />
          <AppItem />
        </List>
      </CardContent>
    </Card>
  );
};

export default AppListCard;
