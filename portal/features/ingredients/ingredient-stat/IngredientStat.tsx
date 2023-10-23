import React from "react";
import {
  Box,
  Paper,
  Divider,
  Stack,
  Typography,
  Tooltip,
  Chip,
  Grid,
} from "@mui/material";
import { NumberStatisticsCard } from "@/components/card";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";

const IngredientStat = () => {
  return (
    <Box>
      <Grid container>
        <Grid item xs={2}>
          <NumberStatisticsCard
            title="Total Nutrients"
            value="10"
            icon={<BubbleChartIcon fontSize="large" />}
            description="Total Ingredient's nutrient"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default IngredientStat;
