import React, { ReactElement } from "react";
import { Box, Stack, Grid } from "@mui/material";

interface ListLayoutProps {
  breadcrumbs?: ReactElement;
  header?: ReactElement;
  actions?: ReactElement;
  children?: ReactElement;
  filter?: ReactElement;
}

const ListLayout = ({
  breadcrumbs,
  header,
  actions,
  children,
  filter,
}: ListLayoutProps) => {
  return (
    <>
      <Box mb={1}>{breadcrumbs}</Box>
      {(header || actions) && (
        <Grid container mb={5}>
          <Grid item xs={12} md={6}>
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
      )}
      {filter && <Box sx={{ my: 5 }}>{filter}</Box>}
      <div style={{ minHeight: "400px" }}>{children}</div>
    </>
  );
};

export default ListLayout;
