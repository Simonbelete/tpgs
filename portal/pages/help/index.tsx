import React from "react";
import siteMetadata from '@/data/siteMetadata';
import Head from "next/head";
import { Button, Container, Divider, Grid, Typography, Paper, IconButton } from "@mui/material";
import { driver } from "driver.js"
import { onBoardConfig } from '@/util/onboard';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { useRouter } from 'next/navigation';
import Cookies from 'universal-cookie';
import { ONBOARDING_KEY } from '@/providers/OnBoarding';

const HelpPage = () => {
  const cookies = new Cookies(null);
  const router = useRouter();

  const handleStartTour = () => {
    cookies.remove(ONBOARDING_KEY);
    router.refresh();
  }

  return (
    <>
      <Head>
        <title>{siteMetadata.headerTitle} - Help</title>
      </Head>
      <Container maxWidth="lg">
        <Grid container direction="row" justifyContent="space-between" alignItems="center" item xs={12}>
          <Typography variant="h3" fontWeight={600} color={"text.primary"} sx={{mb: 5}}>Help</Typography>
          <IconButton size="small" onClick={handleStartTour}><PlayCircleOutlineIcon /></IconButton>
        </Grid>
        <Grid spacing={2}>
          <Paper sx={{ px: 1, py: 1 }} elevation={6} variant="outlined" >
            <Grid container direction="row" justifyContent="space-between" alignItems="center" item xs={12} sx={{}}>
              <Typography variant="body2" color={"text.primary"}>Some Random Text</Typography>
              <Button size="small" variant="text" onClick={() => {}}>Get Started</Button>
            </Grid>
          </Paper>
        </Grid>
      </Container>
    </>
  )
}

export default HelpPage;