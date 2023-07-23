import React from "react";
import { Weight } from "@/models";
import { Paper, Grid, Typography } from "@mui/material";

const WeightView = ({ weight }: { weight: Weight }) => {
  return (
    <Paper sx={{ px: 5, py: 5 }} elevation={6} variant="outlined" square>
      <Grid container spacing={4}>
        <Grid item>
          <Typography>Name</Typography>
        </Grid>
        <Grid item>
          <Typography>{weight.week}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default WeightView;
