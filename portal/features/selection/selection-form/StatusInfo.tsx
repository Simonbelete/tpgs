import React from "react";
import { Stack, Box, Typography } from "@mui/material";
import LightTooltip from "./components/LightTooltip";
import { useGetStagesQuery } from "@/features/stage/services";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";

export const StatusInfo = () => {
  const { data: stageData } = useGetStagesQuery({});

  const option = useSelector((state: RootState) => state.selection.stage);

  return (
    <Stack>
      <Typography color="text.primary" sx={{ fontWeight: 700 }}>
        Stage
      </Typography>
      <Box>
        <ul className="steps steps-5">
          {stageData &&
            stageData.results?.map((e, i) => (
              <li key={i} className={option == e ? "current" : ""}>
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
          {/* current */}
        </ul>
      </Box>
    </Stack>
  );
};
