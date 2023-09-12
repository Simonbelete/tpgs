import { Box } from "@mui/material";
import React from "react";

const Shadow = ({children}: {children: React.ReactNode}) => {
  return (
    <Box sx={{boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px", background: "#fff", borderRadius: "8px"}} >
      {children}
    </Box>
  )
}

export default Shadow;