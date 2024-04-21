import React from "react";
import { Box, Card, Typography, CircularProgress } from "@mui/material";

const GradientCircularProgress = ({ value = 0 }: { value?: number }) => {
  const size = 80,
    thickness = 6,
    color = "#E6E8ED";

  return (
    <React.Fragment>
      <Box
        sx={{
          position: "relative",
          display: "inline-flex",
          height: "fit-content",
        }}
      >
        <svg width={0} height={0}>
          <defs>
            <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e01cd5" />
              <stop offset="100%" stopColor="#1CB5E0" />
            </linearGradient>
          </defs>
        </svg>
        <CircularProgress
          sx={{
            "svg circle": { stroke: "url(#my_gradient)" },
            borderRadius: "50%",
            boxShadow: `inset 0 0 0 ${(thickness / 44) * size}px ${color}`,
          }}
          variant="determinate"
          value={value}
          size={size}
          thickness={thickness}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="caption"
            component="div"
            color="text.secondary"
          >{`${value}%`}</Typography>
        </Box>
      </Box>
    </React.Fragment>
  );
};
export default GradientCircularProgress;
