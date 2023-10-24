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
import { useGetFormulaByIdQuery } from "../services";
import InsightsIcon from "@mui/icons-material/Insights";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";

const FormulaStat = ({ id }: { id: number }) => {
  const { data, isLoading } = useGetFormulaByIdQuery(id);

  return (
    <Box>
      <Grid container gap={5}>
        <Grid item xs={2}>
          <NumberStatisticsCard
            value={`${data?.ingredient_count || "0"}`}
            title="Ingredients"
            icon={<LocalDiningIcon fontSize="large" />}
            description="Total Ingredient count"
          />
        </Grid>
        <Grid item xs={2}>
          <NumberStatisticsCard
            value={`${data?.requirement_count || "-"} %`}
            title="Requirement"
            icon={<BubbleChartIcon fontSize="large" />}
            description="Total requirement nutrients"
          />
        </Grid>
        <Grid item xs={2}>
          <NumberStatisticsCard
            value={`${data?.ration_dm} %`}
            title="Dry matter [%]"
            icon={<WaterDropIcon fontSize="large" />}
            description="Dry Matter"
          />
        </Grid>
        {/* <Grid item xs={2}>
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
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default FormulaStat;
