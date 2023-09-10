import React, { useEffect } from "react";
import Cookies from 'universal-cookie';
import { styled } from '@mui/material/styles';
import { Button,
  useTheme, 
  DialogTitle, Dialog, DialogContent, DialogActions, IconButton, Typography, Grid, Box, Stack } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import siteMetadata from "@/data/siteMetadata";
import { driver } from "driver.js";
import { onBoardConfig } from '@/util/onboard';
import { useSession } from "next-auth/react"
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { START_TEMPLATE, ONBOARDING_KEY, isFirstTime, startFirstTimeOnboarding, updateOnboarding } from '@/features/onboarding'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const OnBoardingProvider = ({children}: {children: React.ReactNode}) => {
  const dispatch = useDispatch();
  const onBoardingState = useSelector((state: RootState) => state.onBoarding);
  const cookies = new Cookies(null);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const { data: session, status } = useSession();

  const handleClose = () => {
    setOpen(false);
    dispatch(updateOnboarding({
      show: false,
      template: START_TEMPLATE,
      step: 0,
      isFirstTime: false
    }));
  };

  const handleStart = async () => {
    setOpen(false);
    dispatch(updateOnboarding({
      show: true,
      template: START_TEMPLATE,
      step: 0,
      isFirstTime: false
    }));
  }

  useEffect(() => {
    setOpen(false);
    if(status !== "authenticated") return;
    
    (async () => {
      try{
        // TODO: use middleware
        if(onBoardingState.isFirstTime) setOpen(true);
        else if(onBoardingState.show) {
          const template = onBoardingState.isFirstTime ? START_TEMPLATE : onBoardingState.template;
          const response = await fetch(`/data/${template}`)
          const data = await response.json();
          const driverObj = driver({
            ...onBoardConfig,
            steps: data,
          });
           
          driverObj.drive(onBoardingState.step);
        }
      } catch(ex) {
        // TODO: Handle error
      }
    })()

  }, [onBoardingState])

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