import React from "react";
import { Flock } from "@/models";
import { Paper, Grid, Typography } from "@mui/material";

const FlockView = ({ flock }: { flock: Flock }) => {
  return (
    <Paper sx={{ px: 5, py: 5 }} elevation={6} variant="outlined" square>
      <Grid container spacing={4}>
        <Grid item>
          <Typography>Name</Typography>
        </Grid>
        <Grid item>
          <Typography>{flock.name}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FlockView;
