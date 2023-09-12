import React from "react";
import { Box, Typography } from '@mui/material';
import Shadow from "../Shadow";

const GraphCard = ({title, children}: {title: string, children: React.ReactNode}) => {
  return (
    <Shadow>
      <Box sx={{ display: "flex", px: 2, py: 1 }} flexDirection={{xs: "column", lg: "row"}}>
        <Box>
          <Typography fontWeight={500} variant="h5">{title}</Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }}/>
      </Box>
      <Box>
        {children}
      </Box>
    </Shadow> 
  )
}

export default GraphCard;