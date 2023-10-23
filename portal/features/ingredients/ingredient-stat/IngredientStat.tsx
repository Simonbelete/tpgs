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
import { useGetIngredientAnalysesQuery } from "../services";
import InsightsIcon from "@mui/icons-material/Insights";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import WaterDropIcon from "@mui/icons-material/WaterDrop";

const IngredientStat = ({ id }: { id: number }) => {
  const { data, isLoading } = useGetIngredientAnalysesQuery(id);

  return (
    <Box>
      <Grid container gap={5}>
        <Grid item xs={2}>
          <NumberStatisticsCard
            value={`${data?.nutrient_count || "0"}`}
            title="Nutrients count"
            icon={<BubbleChartIcon fontSize="large" />}
            description="Total Ingredient's nutrient"
          />
        </Grid>
        {/* <Grid item xs={2}>
          <NumberStatisticsCard
            value={`${data?.composition_total || "-"} %`}
            title="Composition [%]"
            icon={<InsightsIcon fontSize="large" />}
            description="Ingredient Compostion"
          />
        </Grid> */}
        <Grid item xs={2}>
          <NumberStatisticsCard
            value={`${data?.price} /kg`}
            title="Price [kg]"
            icon={<AttachMoneyIcon fontSize="large" />}
            description="Ingredient price per kg"
          />
        </Grid>
        <Grid item xs={2}>
          <NumberStatisticsCard
            value={`${data?.dm} %`}
            title="Dry matter [%]"
            icon={<WaterDropIcon fontSize="large" />}
            description="Dry Matter"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default IngredientStat;
