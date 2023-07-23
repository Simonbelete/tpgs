import React from "react";
import { Breed } from "@/models";
import { Paper, Grid, Typography } from "@mui/material";

const BreedView = ({ breed }: { breed: Breed }) => {
  return (
    <Paper sx={{ px: 5, py: 5 }} elevation={6} variant="outlined" square>
      <Grid container spacing={4}>
        <Grid item>
          <Typography>Name</Typography>
        </Grid>
        <Grid item>
          <Typography>{breed.name}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BreedView;
