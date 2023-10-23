import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Divider,
  Stack,
  Typography,
  Tooltip,
  Chip,
} from "@mui/material";
import dynamic from "next/dynamic";
import { Skeleton } from "@mui/material";

const Chart = dynamic(() => import("./Chart"), {
  ssr: false,
  loading: () => <Skeleton variant="circular" width={150} height={150} />,
});

const IngredientComposition = () => {
  const [data, setData] = useState<{
    values: number[];
    labels: string[];
  }>({
    values: [],
    labels: [],
  });

  return (
    <Box>
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
                <Typography variant="body2" fontWeight={600} color="secondary">
                  1k
                </Typography>
              </Tooltip>
              <Tooltip title="Achivement">
                <Chip
                  size="small"
                  variant="outlined"
                  color={"error"}
                  label={""}
                />
              </Tooltip>
            </Stack>
            <Tooltip title="Desired Cost">
              <Typography variant="caption" color="text.secondary">
                Formual 1
              </Typography>
            </Tooltip>
          </Stack>

          <Stack>
            <Typography variant="caption" color="text.secondary">
              TOTAL Ratio [%]
            </Typography>
            <Stack direction={"row"} spacing={2}>
              <Tooltip title="Achived Ration">
                <Typography variant="body2" fontWeight={600} color="secondary">
                  Text
                </Typography>
              </Tooltip>
              <Tooltip title="Achivement">
                <Chip
                  size="small"
                  variant="outlined"
                  color={"error"}
                  label={""}
                />
              </Tooltip>
            </Stack>
            <Tooltip title="Desired Cost">
              <Typography variant="caption" color="text.secondary">
                a
              </Typography>
            </Tooltip>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};

export default IngredientComposition;
