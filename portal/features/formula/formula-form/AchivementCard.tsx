import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { Formula } from "@/models";
import {
  CancelIcon,
  CreateNewIcon,
  FormLayout,
  HistoryIcon,
  TabFormLayout,
  Form,
} from "@/lib/crud";
import { formulaApi, useLazyFormulateQuery } from "../services";
import { hatcheryApi } from "@/features/hatchery/services";
import { penApi } from "@/features/pen/services";
import _ from "lodash";
import { Card } from "@/components";
import {
  Tabs,
  Tab,
  Box,
  tabsClasses,
  Chip,
  Button,
  Paper,
  Stack,
  Grid,
  Divider,
  Typography,
  Tooltip,
} from "@mui/material";
import { purposeApi } from "@/features/purposes/services";
import { countryApi } from "@/features/countries/services";
import { FormulaIngredientForm } from "./FormulaIngredients";
import { FormulaRequirementForm } from "./FormulaRequirements";

const AchivementCard = ({ data }: { data: Formula }) => {
  const calculateAchivement = (value: number, total: number) => {
    if (total == 0) return 0;
    return Number(Number(value / total).toFixed(3));
  };

  const computeAchivementGradeLabel = (achived: number) => {
    if (achived <= 0 || achived > 100) return "error";
    else if (achived >= 90 && achived <= 100) return "success";
    return "warning";
  };

  return (
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
            UNIT PRICE
          </Typography>
          <Stack direction={"row"} spacing={2}>
            <Tooltip title="Achived Cost">
              <Typography variant="body2" fontWeight={600} color="secondary">
                {_.get(data, "unit_price", 0)}
              </Typography>
            </Tooltip>
            {/* <Tooltip title="Achivement">
              <Chip
                size="small"
                variant="outlined"
                color={computeAchivementGradeLabel(
                  calculateAchivement(
                    _.get(data, "ration_price", 0),
                    _.get(data, "budget", 1)
                  )
                )}
                label={`${calculateAchivement(
                  _.get(data, "ration_price", 0),
                  _.get(data, "budget", 1)
                )} %`}
              />
            </Tooltip> */}
          </Stack>
          {/* <Tooltip title="Desired Cost">
            <Typography variant="caption" color="text.secondary">
              {_.get(data, "budget", 0)}
            </Typography>
          </Tooltip> */}
        </Stack>

        <Stack>
          <Typography variant="caption" color="text.secondary">
            BATCH PRICE
          </Typography>
          <Stack direction={"row"} spacing={2}>
            <Tooltip title="Achived Cost">
              <Typography variant="body2" fontWeight={600} color="secondary">
                {_.get(data, "ration_price", 0)}
              </Typography>
            </Tooltip>
            <Tooltip title="Achivement">
              <Chip
                size="small"
                variant="outlined"
                color={computeAchivementGradeLabel(
                  calculateAchivement(
                    _.get(data, "ration_price", 0),
                    _.get(data, "budget", 1)
                  )
                )}
                label={`${calculateAchivement(
                  _.get(data, "ration_price", 0),
                  _.get(data, "budget", 1)
                )} %`}
              />
            </Tooltip>
          </Stack>
          <Tooltip title="Desired Cost">
            <Typography variant="caption" color="text.secondary">
              {_.get(data, "budget", 0)}
            </Typography>
          </Tooltip>
        </Stack>

        <Stack>
          <Typography variant="caption" color="text.secondary">
            RATION (%)
          </Typography>
          <Stack direction={"row"} spacing={2}>
            <Tooltip title="Achived Ration">
              <Typography variant="body2" fontWeight={600} color="secondary">
                {_.get(data, "ration_ratio", 0)}
              </Typography>
            </Tooltip>
            <Tooltip title="Achivement">
              <Chip
                size="small"
                variant="outlined"
                color={computeAchivementGradeLabel(
                  calculateAchivement(
                    _.get(data, "ration_ratio", 0),
                    _.get(data, "desired_ratio", 1)
                  )
                )}
                label={`${calculateAchivement(
                  _.get(data, "ration_ratio", 0),
                  _.get(data, "desired_ratio", 1)
                )} %`}
              />
            </Tooltip>
          </Stack>
          <Tooltip title="Desired Cost">
            <Typography variant="caption" color="text.secondary">
              {_.get(data, "desired_ratio", 0)}
            </Typography>
          </Tooltip>
        </Stack>

        <Stack>
          <Typography variant="caption" color="text.secondary">
            TOTAL WEIGHT [kg]
          </Typography>
          <Stack direction={"row"} spacing={2}>
            <Tooltip title="Achived Weight">
              <Typography variant="body2" fontWeight={600} color="secondary">
                {_.get(data, "ration_weight", 0)}
              </Typography>
            </Tooltip>
            <Tooltip title="Achivement">
              <Chip
                size="small"
                variant="outlined"
                color={computeAchivementGradeLabel(
                  calculateAchivement(
                    _.get(data, "ration_weight", 0),
                    _.get(data, "weight", 1)
                  )
                )}
                label={`${calculateAchivement(
                  _.get(data, "ration_weight", 0),
                  _.get(data, "weight", 1)
                )} %`}
              />
            </Tooltip>
          </Stack>
          <Tooltip title="Desired Cost">
            <Typography variant="caption" color="text.secondary">
              {_.get(data, "weight", 0)}
            </Typography>
          </Tooltip>
        </Stack>

        <Stack>
          <Typography variant="caption" color="text.secondary">
            DM [%]
          </Typography>
          <Stack direction={"row"} spacing={2}>
            <Tooltip title="Achived DM">
              <Typography variant="body2" fontWeight={600} color="secondary">
                {_.get(data, "ration_dm", 0)}
              </Typography>
            </Tooltip>
            <Tooltip title="Achivement">
              <Chip
                size="small"
                variant="outlined"
                color={computeAchivementGradeLabel(
                  calculateAchivement(
                    _.get(data, "ration_dm", 0),
                    _.get(data, "desired_dm", 1)
                  )
                )}
                label={`${calculateAchivement(
                  _.get(data, "ration_dm", 0),
                  _.get(data, "desired_dm", 1)
                )} %`}
              />
            </Tooltip>
          </Stack>
          <Tooltip title="Desired Cost">
            <Typography variant="caption" color="text.secondary">
              {_.get(data, "desired_dm", 0)}
            </Typography>
          </Tooltip>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default AchivementCard;
