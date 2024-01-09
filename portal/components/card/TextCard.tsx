import React from "react";
import {
  Box,
  Typography,
  Grid,
  ButtonBase,
  Avatar,
  Stack,
  Tooltip,
  Card,
} from "@mui/material";
import Shadow from "../Shadow";
import { useTheme } from "@emotion/react";

const NumberStatisticsCard = ({
  title,
  children,
  value,
  description,
}: {
  title?: string;
  children?: React.ReactNode;
  value?: string;
  description?: string;
}) => {
  const theme = useTheme();

  return (
    <Card variant="outlined" sx={{ borderRadius: 3 }}>
      <Box sx={{ px: 2, py: 1, width: 150 }}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Stack>
            <Typography variant="caption" color="text.secondary">
              {title}
            </Typography>
            <Stack direction={"row"} spacing={2}>
              <Tooltip title="Achived Cost">
                <Typography variant="h6" fontWeight={600} color="secondary">
                  {value}
                </Typography>
              </Tooltip>
            </Stack>
          </Stack>
        </Stack>
        <Typography variant="caption" color="text.secondary">
          {description}
        </Typography>
      </Box>
    </Card>
  );
};

export default NumberStatisticsCard;
