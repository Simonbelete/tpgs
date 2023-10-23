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
  icon,
}: {
  title?: string;
  children?: React.ReactNode;
  value?: string;
  description?: string;
  icon?: React.ReactNode;
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
                <Typography variant="h5" fontWeight={600} color="secondary">
                  {value}
                </Typography>
              </Tooltip>
            </Stack>
          </Stack>
          <ButtonBase sx={{ height: "100%" }}>
            <Avatar
              sx={{
                width: 46,
                height: 46,
                bgcolor: "#fff",
                color: "#6cb640",
              }}
            >
              {icon}
            </Avatar>
          </ButtonBase>
        </Stack>
        <Typography variant="caption" color="text.secondary">
          {description}
        </Typography>
      </Box>
    </Card>
  );
};

export default NumberStatisticsCard;
