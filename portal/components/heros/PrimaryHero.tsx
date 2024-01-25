import React from "react";
import { Box, Container, Typography, Button, Grid } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const PrimaryHero = () => {
  const content = {
    "header-p1": "SAPLING - ",
    "header-p2": "TPGS Platforms",
    description:
      "Delivering farmer preferred, productive and ecologically adapted poultry to smallholders.",
    image:
      "https://images.unsplash.com/photo-1497681883844-82b4f0a359a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
  };
  return (
    <Container>
      <Grid container spacing={8}>
        <Grid item xs={12} md={6}>
          <Box display="flex" height="100%">
            <Box my="auto">
              <Typography variant="h3" component="h3" gutterBottom={true}>
                <Typography
                  color="primary"
                  variant="h3"
                  component="span"
                  sx={{ fontWeight: 500 }}
                >
                  {content["header-p1"]}
                </Typography>
                <Typography
                  variant="h3"
                  component="span"
                  sx={{ fontWeight: 500 }}
                >
                  {content["header-p2"]}
                </Typography>
              </Typography>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                paragraph={true}
              >
                {content["description"]}
              </Typography>
              <Box mt={3}>
                <Link href="/login">
                  <Button variant="contained" type="button" disableElevation>
                    Login
                  </Button>
                </Link>
                <Link href="/sign-up" style={{ marginLeft: "20px" }}>
                  <Button variant="outlined" type="button">
                    Sign-up
                  </Button>
                </Link>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <img src="/images/hero_3.png" alt="Hero Image" width="100%" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default PrimaryHero;
