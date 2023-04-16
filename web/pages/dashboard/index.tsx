import React, { ReactElement } from "react";
import { Grid } from "@mui/material";
import { AppListCard } from "@/features/apps";

const Dashboard = () => {
  return (
    <main>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <AppListCard />
        </Grid>
      </Grid>
    </main>
  );
};

export default Dashboard;
