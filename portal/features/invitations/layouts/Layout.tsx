import React, { ReactElement } from "react";
import { Grid, Box } from "@mui/material";

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
    >
      <Grid
        md={8}
        sx={{ background: "#f5faf8" }}
        display={{ xs: "none", md: "block" }}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <img src="/images/hero_3.png" width="60%" />;
        </Box>
      </Grid>
      <Grid md={4}>
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
