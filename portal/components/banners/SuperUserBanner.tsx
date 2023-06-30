import React from "react";
import { Container, Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const SuperUserBanner = () => {
  const theme = useTheme();

  return (
    <Box sx={{ background: theme.palette.primary.main, height: 25 }}>
      <Container maxWidth="lg">
        <Box>
          <Typography variant="caption">Super User</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Typography variant="caption">Turn Off</Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default SuperUserBanner;
