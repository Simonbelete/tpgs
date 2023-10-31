import React, { ReactElement } from "react";
import { Box, Stack } from "@mui/material";

interface CreateLayoutProps {
  breadcrumbs?: ReactElement;
  header?: ReactElement;
  actions?: ReactElement;

  children: ReactElement;
}

const CreateLayout = ({
  children,
  breadcrumbs,
  header,
  actions,
}: CreateLayoutProps) => {
  return (
    <>
      <Box mb={2}>{breadcrumbs}</Box>
      {header && (
        <Box sx={{ display: "flex" }} mb={5}>
          {header}
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction="row" spacing={2}>
            {actions}
          </Stack>
        </Box>
      )}
      <Box sx={{ height: "auto" }}>{children}</Box>
    </>
  );
};

export default CreateLayout;
