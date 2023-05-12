import React from "react";
import { Button, Box, Stack } from "@mui/material";
import AppsDropdownMenu from "./AppsDropdownMenu";

const PrimaryMenu = () => {
  return (
    <Box sx={{ display: { xs: "none", sm: "block" } }}>
      <Stack direction="row" spacing={2}>
        <AppsDropdownMenu />
        <Button>Login</Button>
        <Button variant="outlined">Sign Up</Button>
      </Stack>
    </Box>
  );
};

export default PrimaryMenu;
