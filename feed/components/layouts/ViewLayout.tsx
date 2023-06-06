import React, { ReactElement } from "react";
import { Box, Stack } from "@mui/material";

interface ViewLayoutProps {
  breadcrumbs?: ReactElement;
  header?: ReactElement;
  actions?: ReactElement;

  children: ReactElement;
}

const ViewLayout = ({
  children,
  breadcrumbs,
  header,
  actions,
}: ViewLayoutProps) => {
  return (
    <>
      <Box mb={2}>{breadcrumbs}</Box>
      <Box sx={{ display: "flex" }} mb={5}>
        {header}
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" spacing={2}>
          {actions}
        </Stack>
      </Box>
      <Box sx={{ height: "100%" }}>{children}</Box>
    </>
  );
};

export default ViewLayout;
