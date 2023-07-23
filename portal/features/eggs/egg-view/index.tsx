import React from "react";
import { Egg } from "@/models";
import { Paper, Grid, Typography } from "@mui/material";

const EggView = ({ egg }: { egg: Egg }) => {
  return (
    <Paper sx={{ px: 5, py: 5 }} elevation={6} variant="outlined" square>
      <Grid container spacing={4}>
        <Grid item>
          <Typography>Name</Typography>
        </Grid>
        <Grid item>
          <Typography>{egg.weight}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default EggView;
