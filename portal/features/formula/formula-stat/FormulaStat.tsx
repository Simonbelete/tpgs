import React, { useEffect, useState } from "react";
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

  const [goalAchivements, setGoalAchivements] = useState({
    total_cost: 0,
    total_ratio: 0,
    total_weight: 0,
    total_dm: 0,
  });

  useEffect(() => {
    const cost_achived: number = data?.ration_price || 0;
    const cost_goal: number = data?.budget || 0;

    const ratio_achived: number = data?.ration_ratio || 0;
    const ratio_goal: number = data?.desired_ratio || 0;

    const weight_achived: number = data?.ration_weight || 0;
    const weight_goal: number = data?.weight || 0;

    const dm_achived: number = data?.ration_dm || 0;
    const dm_goal: number = data?.desired_dm || 0;

    setGoalAchivements({
      total_cost: Number(
        ((cost_achived / (cost_goal == 0 ? 1 : cost_goal)) * 100).toFixed(3)
      ),
      total_ratio: Number(
        ((ratio_achived / (ratio_goal == 0 ? 1 : ratio_goal)) * 100).toFixed(3)
      ),
      total_weight: Number(
        ((weight_achived / (weight_goal == 0 ? 1 : weight_goal)) * 100).toFixed(
          3
        )
      ),
      total_dm: Number(
        ((dm_achived / (dm_goal == 0 ? 1 : dm_goal)) * 100).toFixed(3)
      ),
    });
  }, [data]);

  const computeAchivementGradeLabel = (achived: number) => {
    if (achived <= 0 || achived > 100) return "error";
    else if (achived >= 90 && achived <= 100) return "success";
    return "warning";
  };

  return (
    <Box>
      <Box sx={{ mb: 5 }}>
        <Paper sx={{ py: 1, px: 5 }} elevation={0} variant="outlined" square>
          <Stack
            direction={{ xs: "column", lg: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "left", lg: "center" }}
            spacing={{ xs: 2, lg: 0 }}
            divider={
              <Divider
                // @ts-ignore
                orientation={{ xs: "horizontal", lg: "vertical" }}
                flexItem
              />
            }
          >
            <Stack>
              <Typography variant="caption" color="text.secondary">
                TOTAL COST
              </Typography>
              <Stack direction={"row"} spacing={2}>
                <Tooltip title="Achived Cost">
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    color="secondary"
                  >
                    {data?.ration_price}
                  </Typography>
                </Tooltip>
                <Tooltip title="Achivement">
                  <Chip
                    size="small"
                    variant="outlined"
                    color={computeAchivementGradeLabel(
                      goalAchivements.total_cost
                    )}
                    label={`${goalAchivements.total_cost} %`}
                  />
                </Tooltip>
              </Stack>
              <Tooltip title="Desired Cost">
                <Typography variant="caption" color="text.secondary">
                  {data?.budget}
                </Typography>
              </Tooltip>
            </Stack>

            <Stack>
              <Typography variant="caption" color="text.secondary">
                TOTAL Ratio [%]
              </Typography>
              <Stack direction={"row"} spacing={2}>
                <Tooltip title="Achived Ration">
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    color="secondary"
                  >
                    {data?.ration_ratio}
                  </Typography>
                </Tooltip>
                <Tooltip title="Achivement">
                  <Chip
                    size="small"
                    variant="outlined"
                    color={computeAchivementGradeLabel(
                      goalAchivements.total_ratio
                    )}
                    label={`${goalAchivements.total_ratio} %`}
                  />
                </Tooltip>
              </Stack>
              <Tooltip title="Desired Cost">
                <Typography variant="caption" color="text.secondary">
                  {data?.desired_ratio}
                </Typography>
              </Tooltip>
            </Stack>

            <Stack>
              <Typography variant="caption" color="text.secondary">
                TOTAL WEIGHT [kg]
              </Typography>
              <Stack direction={"row"} spacing={2}>
                <Tooltip title="Achived Weight">
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    color="secondary"
                  >
                    {data?.ration_weight}
                  </Typography>
                </Tooltip>
                <Tooltip title="Achivement">
                  <Chip
                    size="small"
                    variant="outlined"
                    color={computeAchivementGradeLabel(
                      goalAchivements.total_weight
                    )}
                    label={`${goalAchivements.total_weight} %`}
                  />
                </Tooltip>
              </Stack>
              <Tooltip title="Desired Cost">
                <Typography variant="caption" color="text.secondary">
                  {data?.weight}
                </Typography>
              </Tooltip>
            </Stack>

            <Stack>
              <Typography variant="caption" color="text.secondary">
                TOTAL DM [%]
              </Typography>
              <Stack direction={"row"} spacing={2}>
                <Tooltip title="Achived DM">
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    color="secondary"
                  >
                    {data?.ration_dm}
                  </Typography>
                </Tooltip>
                <Tooltip title="Achivement">
                  <Chip
                    size="small"
                    variant="outlined"
                    color={computeAchivementGradeLabel(
                      goalAchivements.total_dm
                    )}
                    label={`${goalAchivements.total_dm} %`}
                  />
                </Tooltip>
              </Stack>
              <Tooltip title="Desired Cost">
                <Typography variant="caption" color="text.secondary">
                  {data?.desired_dm}
                </Typography>
              </Tooltip>
            </Stack>
          </Stack>
        </Paper>
      </Box>
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
        </Grid>
      </Box>
    </Box>
  );
};

export default FormulaStat;
