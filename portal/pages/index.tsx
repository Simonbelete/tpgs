import React from "react";
import LaunchIcon from "@mui/icons-material/Launch";
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  PrimaryMenu,
  SignUpNowCTA,
  PrimaryHero,
  AppIntro,
  AppsDescription,
  TpgsVideos,
} from "@/components";
import { ILRILogo } from "@/components/logos";
import { ReactElement } from "react";
import { PrimaryFooter } from "@/components/footers";
import { ContactUsForm } from "@/features/contact-us";
import { SeoHead } from "@/seo";
import { NextPageContext } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

function Home() {
  const theme = useTheme();

  return (
    <>
      <SeoHead title="Home" />
      <main>
        <Box sx={{ background: "#f5faf8" }}>
          <Container maxWidth="lg">
            <Box
              sx={{
                py: 1,
                px: 2,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Link
                href="https://www.ilri.org/"
                underline="none"
                variant="body1"
                color="black"
                target="_blank"
                style={{ color: "#495056" }}
              >
                ILRI
                <LaunchIcon sx={{ fontSize: 20, pl: 0.7 }} />
              </Link>
            </Box>
          </Container>
          <AppBar
            position="static"
            elevation={0}
            sx={{ background: "#f5faf8" }}
          >
            <Toolbar>
              <Container>
                <Box sx={{ display: "flex" }}>
                  {/* <Logo /> */}
                  <ILRILogo />
                  <Box sx={{ flexGrow: 1 }} />
                  <PrimaryMenu />
                </Box>
              </Container>
              <Stack direction="row" spacing={2}></Stack>
            </Toolbar>
          </AppBar>
          <Box sx={{ background: "#f5faf8", py: 5 }}>
            <PrimaryHero />
          </Box>
        </Box>
        <Box sx={{ height: 50 }} />
        <AppIntro />
        <Box sx={{ height: 50 }} />

        <TpgsVideos />
        <Box sx={{ height: 50 }} />

        <SignUpNowCTA />
        <AppsDescription />
        <ContactUsForm />

        <footer
          style={{
            marginTop: "auto",
            background: theme.palette.secondary.dark,
          }}
        >
          <Container>
            <PrimaryFooter />
          </Container>
        </footer>
      </main>
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export async function getServerSideProps(context: NextPageContext) {
  // @ts-ignore
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

export default Home;
