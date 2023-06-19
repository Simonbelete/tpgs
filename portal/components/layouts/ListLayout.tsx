import React, { ReactElement } from "react";
import { Box, Stack, Grid } from "@mui/material";

interface ListLayoutProps {
  breadcrumbs?: ReactElement;
  header?: ReactElement;
  actions?: ReactElement;
  children?: ReactElement;
}

const ListLayout = ({
  breadcrumbs,
  header,
  actions,
  children,
}: ListLayoutProps) => {
  return (
    <>
      <Box mb={2}>{breadcrumbs}</Box>
      <Grid container mb={5}>
        <Grid item xs={12} md={4}>
          <Box sx={{ display: "flex" }} justifyContent={"start"}>
            {header}
          </Box>
        </Grid>
        {/* <Box sx={{ flexGrow: 1 }} /> */}
        <Grid item xs={12} md />
        <Grid item xs={12} md={4}>
          <Stack
            direction="row"
            justifyContent={{ xs: "start", md: "end" }}
            spacing={2}
          >
            {actions}
          </Stack>
        </Grid>
      </Grid>
      <Box sx={{ height: "70%" }}>{children}</Box>
    </>
  );
};

export default ListLayout;
