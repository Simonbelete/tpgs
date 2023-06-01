import { Box, Stack } from "@mui/material";
import React, { ReactElement } from "react";

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
    <div>
      <Box mb={2}>{breadcrumbs}</Box>
      <Box sx={{ display: "flex" }} mb={5}>
        {header}
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" spacing={2}>
          {actions}
        </Stack>
      </Box>
      <Box sx={{ height: "100%" }}>{children}</Box>
    </div>
  );
};

export default ListLayout;
