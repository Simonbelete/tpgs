import React from "react";
import Link from "next/link";
import { Button, Box, Stack } from "@mui/material";
import AppsDropdownMenu from "./AppsDropdownMenu";

const PrimaryMenu = () => {
  return (
    <Box sx={{ display: { xs: "none", sm: "block" } }}>
      <Stack direction="row" spacing={2}>
        <AppsDropdownMenu />
        <Link href="/login">
          <Button>Login</Button>
        </Link>
        <Link href="/sing-up">
          <Button variant="outlined">Sign Up</Button>
        </Link>
      </Stack>
    </Box>
  );
};

export default PrimaryMenu;
