import React, { ReactElement } from "react";
import Link from "next/link";
import { Button, Container, Box, Typography, Stack } from "@mui/material";
import { useRouter } from "next/router";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import HomeIcon from "@mui/icons-material/Home";

const NotFoundPage = () => {
  const router = useRouter();
  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection={"column"}
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography
          color="primary"
          variant="h1"
          component="span"
          sx={{ fontWeight: 800, mb: 2 }}
        >
          404
        </Typography>
        <Typography
          color="textSecondary"
          variant="h6"
          component="span"
          sx={{ fontWeight: 800, mb: 5 }}
        >
          Page Not Found
        </Typography>
        <Stack gap={3} direction={"row"}>
          <Link href={String(router.query.from || "/")}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<KeyboardBackspaceIcon />}
            >
              Go Back
            </Button>
          </Link>

          <Link href={"/"}>
            <Button variant="text" size="small" startIcon={<HomeIcon />}>
              Home
            </Button>
          </Link>
        </Stack>
      </Box>
    </Container>
  );
};

NotFoundPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default NotFoundPage;
