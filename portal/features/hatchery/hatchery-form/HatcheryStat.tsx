import React from "react";
import { Hatchery } from "@/models";
import { Box, Grid } from "@mui/material";
import { TextCard } from "@/components/card";

export const HatcheryStat = ({ data }: { data: Hatchery }) => {
  return (
    <Box>
      <Grid container gap={5}>
        <Grid item xs={3} md={2}>
          <TextCard
            title="Eggs"
            value={`${
              (data.total_egg_set || 0) - (data.total_removed_eggs || 0)
            } / ${data.total_egg_set || "-"}`}
            description={"Total Egg Set"}
          />
        </Grid>
        <Grid item xs={3} md={2}>
          <TextCard
            title="Hatched Eggs"
            value={`${data.total_hatched_egg || "-"}`}
          />
        </Grid>
        <Grid item xs={3} md={2}>
          <TextCard
            title="Infertile Eggs"
            value={`${data.total_infertile_eggs || "-"}`}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
