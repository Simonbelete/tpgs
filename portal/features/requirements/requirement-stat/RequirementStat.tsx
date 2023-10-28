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
import { useGetRequirementAnalysesQuery } from "../services";
import InsightsIcon from "@mui/icons-material/Insights";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import ScaleIcon from "@mui/icons-material/Scale";

const RequirementStat = ({ id }: { id: number }) => {
  const { data, isLoading } = useGetRequirementAnalysesQuery(id);

  return (
    <Box>
      <Grid container gap={5}>
        <Grid item xs={2}>
          <NumberStatisticsCard
            value={`${data?.nutrient_count || "0"}`}
            title="Nutrients count"
            icon={<BubbleChartIcon fontSize="large" />}
            description="Total Requirement's nutrient"
          />
        </Grid>
        <Grid item xs={2}>
          <NumberStatisticsCard
            value={`${data?.weight || "-"} kg`}
            title="Weight"
            icon={<ScaleIcon fontSize="large" />}
            description="Requirement Weight"
          />
        </Grid>
        <Grid item xs={2}>
          <NumberStatisticsCard
            value={`${data?.budget} /kg`}
            title="Price [kg]"
            icon={<AttachMoneyIcon fontSize="large" />}
            description="Estimated price per kg"
          />
        </Grid>
        <Grid item xs={2}>
          <NumberStatisticsCard
            value={`${data?.desired_dm} %`}
            title="Dry matter [%]"
            icon={<WaterDropIcon fontSize="large" />}
            description="Dry Matter"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default RequirementStat;
