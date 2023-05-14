import React, { ReactElement } from "react";
import { Grid, Box } from "@mui/material";
import LoginBannerImage from "./LoginBannerImage";

interface LayoutProps {
  children?: ReactElement | string;
}

const Layout = (props: LayoutProps) => {
  const { children } = props;

  return (
    <Grid
      container
      spacing={0}
      direction="row"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid xs={8} sx={{ background: "#f5faf8" }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <LoginBannerImage />
        </Box>
      </Grid>
      <Grid xs={4}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          {children}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Layout;
