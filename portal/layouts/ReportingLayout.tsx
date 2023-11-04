import React, { ReactElement } from "react";
import { Box, Stack, Grid, Typography, IconButton } from "@mui/material";
import Link from "next/link";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

interface ListLayoutProps {
  breadcrumbs?: ReactElement;
  header?: ReactElement;
  actions?: ReactElement;
  children?: ReactElement;
  filter?: ReactElement;
}

const ReportingLayout = ({
  breadcrumbs,
  header,
  actions,
  children,
  filter,
}: ListLayoutProps) => {
  return (
    <>
      <Box mb={1}>{breadcrumbs}</Box>
      <Grid container mb={5}>
        <Grid item xs={12} md={8}>
          <Box sx={{ display: "flex" }} justifyContent={"start"}>
            <Link href={"/reports"}>
              <IconButton sx={{ mr: 1 }} color="primary">
                <ArrowBackIosIcon />
              </IconButton>
            </Link>
            {header}
          </Box>
          {/* <Box sx={{ display: "flex" }} justifyContent={"start"}>
            {header}
          </Box> */}
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
      <Box sx={{ my: 5 }}>{filter}</Box>
      <Box sx={{ height: "70%" }}>{children}</Box>
    </>
  );
};

export default ReportingLayout;
