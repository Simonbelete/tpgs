import React, { ReactElement } from "react";
import { AppBar, Toolbar, Box, Container, Stack } from "@mui/material";
import { Logo, PrimaryMenu } from "@/components";

const PortalNavBar = () => {
  return (
    <AppBar position="static" elevation={1} color="white">
      <Toolbar>
        <Container maxWidth={false}>
          <Box sx={{ display: "flex" }}>
            <Logo size={130} />
            <Box sx={{ flexGrow: 1 }} />
            <PrimaryMenu />
          </Box>
        </Container>
        <Stack direction="row" spacing={2}></Stack>
      </Toolbar>
    </AppBar>
  );
};

export default PortalNavBar;
