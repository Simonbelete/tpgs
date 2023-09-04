import Image from "next/image";
import { Inter } from "next/font/google";
import LaunchIcon from "@mui/icons-material/Launch";
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Link,
  Stack,
  Grid,
  useTheme,
} from "@mui/material";

import {
  Logo,
  PrimaryMenu,
  SignUpNowCTA,
  PrimaryHero,
  AppIntro,
  Copyright,
  AppsDescription,
} from "@/components";
import { ILRILogo } from "@/components/logos";
import { ReactElement } from "react";
import { PrimaryFooter } from "@/components/footers";
import { ContactUsForm } from "@/features/contact-us";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const theme = useTheme();
  return (
    <>
      <Head>
        <title>ILRI TPGS - Homepage</title>
      </Head>
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
                style={{color: "#495056"}}
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
