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
      {header && (
        <Box
          sx={{ display: "flex" }}
          flexDirection={{ xs: "column", lg: "row" }}
          mb={5}
        >
          {header}
          <Box sx={{ flexGrow: 1 }} />
          {actions && (
            <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
              {actions}
            </Stack>
          )}
        </Box>
      )}
      <Box sx={{ height: "auto", pb: 10 }}>{children}</Box>
    </>
  );
};

export default EditLayout;
