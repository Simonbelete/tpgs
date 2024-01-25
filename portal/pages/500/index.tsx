import React, { ReactElement } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Container, Box, Typography, Stack } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import HomeIcon from "@mui/icons-material/Home";
import { SeoHead } from "@/seo";

const ServerErrorFoundPage = () => {
  const router = useRouter();
  return (
    <>
      <SeoHead title="500" />
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
            500
          </Typography>
          <Typography
            color="textSecondary"
            variant="h6"
            component="span"
            sx={{ fontWeight: 800, mb: 5 }}
          >
            Internal Server Error
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
    </>
  );
};

ServerErrorFoundPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default ServerErrorFoundPage;
