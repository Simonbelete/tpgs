import { Box, SxProps } from "@mui/material";
import React from "react";

const Shadow = ({children, radius}: {children: React.ReactNode, radius: string}) => {
  return (
    <Box sx={{boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px", background: "#fff", borderRadius: radius }} >
      {children}
    </Box>
  )
}

export default Shadow;