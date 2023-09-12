import { MiniStatistics } from "@/components";
import { Grid } from "@mui/material";
import React from "react";

const ChickenStat = () => {
  return (
    <Grid container columns={{ xs: 1, md: 2, lg: 6 }} columnSpacing={4} spacing={4}>
      <Grid item xs>
        <MiniStatistics name="Users" value="200" />
      </Grid>
    </Grid>
  )
}

export default ChickenStat;