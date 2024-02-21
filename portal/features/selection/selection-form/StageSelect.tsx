import { StageDropdown } from "@/features/stage";
import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Tooltip,
  TooltipProps,
  tooltipClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useGetStagesQuery } from "@/features/stage/services";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { setStage } from "./slice";
import LightTooltip from "./components/LightTooltip";

export const StageSelect = () => {
  const { data: stageData } = useGetStagesQuery({});
  const dispatch = useDispatch();

  const option = useSelector((state: RootState) => state.selection.stage);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography color="text.primary" sx={{ fontWeight: 700 }}>
          Select Steps
        </Typography>
        <Box>
          <ul className="steps steps-5">
            {stageData &&
              stageData.results?.map((e, i) => (
                <li
                  key={i}
                  onClick={() => {
                    dispatch(setStage(e));
                  }}
                  className={option == e ? "current" : ""}
                >
                  <a href="#" title="">
                    <LightTooltip title={`Step ${e.order} ${e.name}`}>
                      <Box>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 700 }}
                        >
                          Step {e.order}
                        </Typography>
                        <Typography variant="caption" noWrap>
                          {e.name}
                        </Typography>
                      </Box>
                    </LightTooltip>
                  </a>
                </li>
              ))}
          </ul>
        </Box>
      </Grid>
    </Grid>
  );
};
