import React from "react";
import { Container, Grid, Stack, Box, Typography } from "@mui/material";
import Link from "next/link";
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
            <Typography
              variant="subtitle1"
              color="textSecondary"
              paragraph={true}
            >
              Supervised by:{" "}
              <Link href="https://www.ilri.org/people/tadelle-dessie">
                Dr Tadelle Dessie
              </Link>{" "}
              ,{" "}
              <Link href="https://wondmenehesatu.com/">Dr Wondmeneh Esatu</Link>
            </Typography>
          </Box>
          <AppList />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            <img
              src="/images/chickens_image.jpg"
              width={"100%"}
              style={{ marginBottom: "20px" }}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AppIntro;
