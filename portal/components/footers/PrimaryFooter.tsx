import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { ILRILogo } from "../logos";

const PrimaryFooter = () => {
  return (
    <>
      <Box sx={{ minHeight: 50, px: 10, py: 10 }}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <img
              src="/images/ilri_logo.png"
              alt="ILIR CGIAR Logo"
              height={70}
            />
          </Grid>
          <Grid item xs={4}>
            <Typography>Contact Us</Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PrimaryFooter;
