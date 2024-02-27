import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useGetStagesQuery } from "@/features/stage/services";
import LightTooltip from "@/features/selection/selection-form/components/LightTooltip";
import { Chicken } from "@/models";
import _ from "lodash";

export const ChickenStages = ({ data }: { data: Chicken }) => {
  const { data: stageData } = useGetStagesQuery({});

  return (
    <Box>
      <ul className="steps steps-5">
        {stageData &&
          stageData.results?.map((e, i) => (
            <li
              key={i}
              className={
                // @ts-ignore
                (_.get(data, "stage", 0) as number) == e ? "current" : ""
              }
            >
              <a href="#" title="">
                <LightTooltip title={`Step ${e.order} ${e.name}`}>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
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
  );
};
