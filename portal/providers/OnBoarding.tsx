import React, { useEffect } from "react";
import Cookies from 'universal-cookie';
import { styled } from '@mui/material/styles';
import { Button,
  useTheme, 
  DialogTitle, Dialog, DialogContent, DialogActions, IconButton, Typography, Grid, Box, Stack } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { OnBoarding } from "@/models";
import siteMetadata from "@/data/siteMetadata";
import { driver } from "driver.js";
import { onBoardConfig } from '@/util/onboard';
import { getSession } from "next-auth/react";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export const ONBOARDING_KEY = 'onboarding';
export const START_TEMPLATE = 'lets_get_started'

const OnBoardingProvider = ({children}: {children: React.ReactNode}) => {
  const cookies = new Cookies(null);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  const handleClose = () => {
    setOpen(false);
    cookies.set(ONBOARDING_KEY, {show: false, template: START_TEMPLATE, step: 0});
  };

  const handleStart = async () => {
    try{
      const session = await getSession();
      // if(!session) return;

      const response = await fetch(`/data/onboarding/${START_TEMPLATE}.json`)
      const data = await response.json();
      const steps = data;
      const driverObj = driver({
        ...onBoardConfig,
        steps: steps,
      });

      driverObj.drive();
      setOpen(false);
    } catch(ex){

    }
  }

  useEffect(() => {
    (async () => {
      try{
        const session = await getSession();
        // if(!session) return;

        const onboard = cookies.get<OnBoarding>(ONBOARDING_KEY);
        console.log(onboard);
        if(onboard == undefined) {
          setOpen(true);
        }else if(onboard.show) {
          const steps = require(`../data/${onboard.template}`)
          const driverObj = driver({
            ...onBoardConfig,
            steps: steps,
          });
          driverObj.drive(onboard.step);
        }
      }catch(ex) {
            
      }
    })();
  }, []);

  return (
    <>

  <div>
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle fontWeight={500} sx={{ m: 0, px: 2, py: 1 }} id="customized-dialog-title">
        Welcome, take a tour
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Box display={"flex"} alignContent={"center"} justifyContent={"center"} sx={{mb: 5, mt: 1}}>
          <img src="/images/ilri_logo.png" width={200} />
        </Box>
        <Grid>
          <Typography variant="h6" fontWeight={600}>Hi there!</Typography>
          <Typography>Welcome to {siteMetadata.title} &#128075;. {" "}Let's get you started with <br /> a quick tuorial.</Typography>
        </Grid>
        <Stack spacing={2} sx={{mb: 2, mt: 6}}>
          <Button autoFocus variant="contained" disableElevation onClick={handleStart}>
            Let's go!
          </Button>
          <Button onClick={handleClose} variant="outlined" style={{textTransform: 'none'}}>
            No thanks, I've used {siteMetadata.title} before.
          </Button>
        </Stack>
      </DialogContent>
    </BootstrapDialog>
  </div>
      {children}
    </>
  )
}

export default OnBoardingProvider;