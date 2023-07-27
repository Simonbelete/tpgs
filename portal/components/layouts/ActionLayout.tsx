import React, { ReactElement } from "react";
import { Box, Paper, Stack } from "@mui/material";

interface ActionLayoutProps {
  breadcrumbs?: ReactElement;
  header?: ReactElement;
  actions?: ReactElement;
  children: ReactElement;
  toolbars?: ReactElement | ReactElement[];
}

const ActionLayout = ({
  children,
  breadcrumbs,
  header,
  actions,
  toolbars,
}: ActionLayoutProps) => {
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

export default ActionLayout;
