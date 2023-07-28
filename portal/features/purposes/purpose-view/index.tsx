import React from "react";
import { Purpose } from "@/models";
import { Paper, Grid, Typography } from "@mui/material";

const PurposeView = ({ purpose }: { purpose: Purpose }) => {
  return (
    <Paper sx={{ px: 5, py: 5 }} elevation={6} variant="outlined" square>
      <Grid container spacing={4}>
        <Grid item>
          <Typography>Name</Typography>
        </Grid>
        <Grid item>
          <Typography>{purpose.name}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PurposeView;
