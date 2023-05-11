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
} from "@mui/material";

import { Logo, PrimaryMenu, SignUpNowCTA, PrimaryHero } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
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
          >
            ILRI
            <LaunchIcon sx={{ fontSize: 20, pl: 0.7 }} />
          </Link>
        </Box>
      </Container>
      <AppBar position="static" elevation={0} color="white">
        <Toolbar>
          <Container>
            <Box sx={{ display: "flex" }}>
              <Logo />
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
      <Box sx={{ height: 50 }} />
      <SignUpNowCTA />
    </main>
  );
}
