import React from "react";
import { Skeleton } from '@mui/material';

const FarmsHeatmapSkeleton = () => {
  return (
    <Skeleton sx={{ height: 500 }} animation="wave" variant="rectangular" />
  )
}

export default FarmsHeatmapSkeleton;