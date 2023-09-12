import React from "react";
import { Box, Typography } from '@mui/material';
import Shadow from "../Shadow";

const StatisticsCard = ({title, children}: {title: string, children: React.ReactNode}) => {
  return (
    <Shadow>
      <Box sx={{ display: "flex", px: 2, py: 1 }} flexDirection={{xs: "column", lg: "row"}}>
        <Box>
          <Typography variant="body1" fontWeight={600} color="text.primary">{title}</Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }}/>
      </Box>
      <Box>
        {children}
      </Box>
    </Shadow> 
  )
}

export default StatisticsCard;