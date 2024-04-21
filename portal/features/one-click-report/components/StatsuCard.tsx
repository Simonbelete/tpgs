import React from "react";
import { Box, Card, Typography, CircularProgress } from "@mui/material";
import { GradientCircularProgress } from "@/components";

const StatusCard = ({
  title,
  value,
  subttile,
  percentage,
  color = "text.secondary",
}: {
  title: string;
  value: number | string;
  subttile: string;
  percentage?: number;
  color?: string;
}) => {
  return (
    <Box>
      <Card
        variant="outlined"
        sx={{
          borderRadius: 3,
          minWidth: 150,
          width: "fit-content",
        }}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          flexDirection={"row"}
          gap={3}
          sx={{ pl: 2, pr: 0.3, py: 1, minWidth: "150", width: 250 }}
        >
          <Box>
            <Typography variant="caption" color={color}>
              {title}
            </Typography>
            <Typography variant="h6" fontWeight={600} color="secondary">
              {value}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {subttile}
            </Typography>
          </Box>
          {percentage && <GradientCircularProgress value={percentage} />}
        </Box>
      </Card>
    </Box>
  );
};

export default StatusCard;
