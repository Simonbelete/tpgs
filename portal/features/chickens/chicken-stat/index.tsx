import React from "react";
import { Chicken } from "@/models";
import { Box, Grid } from "@mui/material";
import { TextCard } from "@/components/card";

export const ChickenStat = ({ data }: { data: Chicken }) => {
  return (
    <Box>
      <Grid container gap={5}>
        <Grid item xs={3} md={3}>
          <TextCard
            title="Age"
            value={`${data.age_in_weeks || "-"} Week`}
            description={`${data.age_in_days || "-"} Days`}
          />
        </Grid>
        <Grid item xs={3} md={3}>
          <TextCard title="Generation" value={`${data.generation || "-"}`} />
        </Grid>
      </Grid>
    </Box>
  );
};
