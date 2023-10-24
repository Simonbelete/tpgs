import React from "react";
import { Skeleton, Stack } from "@mui/material";

const BarChartSkeleton = () => {
  return (
    <Stack direction={"column"} gap={3}>
      <Skeleton variant="rectangular" width={50} height={"100%"} />
      <Skeleton variant="rectangular" width={50} height={"100%"} />
      <Skeleton variant="rectangular" width={50} height={"100%"} />
      <Skeleton variant="rectangular" width={50} height={"100%"} />
    </Stack>
  );
};

export default BarChartSkeleton;
