import React from "react";
import { Box, Container, Typography, Button, Grid } from "@mui/material";
import Image from "next/image";

const PrimaryHero = () => {
  const content = {
    "header-p1": "TPGS - ",
    "header-p2": "Tropical Poultry Genetics Solutions",
    description:
      "Suspendisse aliquam tellus ante, porttitor mattis diam eleifend quis. Pellentesque pulvinar commodo eros sit amet finibus.",
    "primary-action": "Action",
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
                <Typography color="primary" variant="h3" component="span">
                  {content["header-p1"]}{" "}
                </Typography>
                <Typography variant="h3" component="span">
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
                <Button variant="contained" color="secondary">
                  {content["primary-action"]}
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <img src="/images/hero_2.jpg" alt="Hero Image" height="500" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default PrimaryHero;
