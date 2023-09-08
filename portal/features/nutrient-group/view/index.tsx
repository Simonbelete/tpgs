import React from "react";
import { NutrientGroup } from "@/models";
import { Paper, Grid, Typography } from "@mui/material";

const NutrientGroupView = ({
  nutrient_group,
}: {
  nutrient_group: NutrientGroup;
}) => {
  return (
    <Paper sx={{ px: 5, py: 5 }} elevation={6} variant="outlined" square>
      <Grid container spacing={4}>
        <Grid item>
          <Typography>Name</Typography>
        </Grid>
        <Grid item>
          <Typography>{nutrient_group.name}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default NutrientGroupView;
