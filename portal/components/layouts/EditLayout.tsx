import React, { ReactElement } from "react";
import { Box, Stack } from "@mui/material";

interface EditLayoutProps {
  breadcrumbs?: ReactElement;
  header?: ReactElement;
  actions?: ReactElement;

  children: ReactElement;
}

const EditLayout = ({
  children,
  breadcrumbs,
  header,
  actions,
}: EditLayoutProps) => {
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
      <Box sx={{ height: "auto" }}>{children}</Box>
    </>
  );
};

export default EditLayout;
