import React from "react";
import { Container, Grid, Stack, Box, Typography } from "@mui/material";
import AppList from "../apps-list";

const AppIntro = () => {
  const content = {
    "header-p1": "TPGS Platforms",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
  };
  return (
    <Container>
      <Grid container spacing={10}>
        <Grid item xs={12} md={6}>
          <Box my="auto">
            <Typography variant="h4" component="h4">
              {content["header-p1"]}
            </Typography>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              paragraph={true}
            >
              {content["description"]}
            </Typography>
          </Box>
          <AppList />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            <img
              src="https://placehold.co/400"
              width={400}
              style={{ marginBottom: "20px" }}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AppIntro;
