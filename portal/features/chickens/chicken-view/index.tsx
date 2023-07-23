import React from "react";
import { Chicken } from "@/models";
import { Paper, Grid, Typography } from "@mui/material";

const ChickenView = ({ chicken }: { chicken: Chicken }) => {
  return (
    <Paper sx={{ px: 5, py: 5 }} elevation={6} variant="outlined" square>
      <Grid container spacing={4}>
        <Grid item>
          <Typography>TAg</Typography>
        </Grid>
        <Grid item>
          <Typography>{chicken.tag}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ChickenView;
