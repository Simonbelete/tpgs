import React from "react";
import { Container, Grid, Stack, Box, Typography } from "@mui/material";
import Link from "next/link";
import AppList from "../apps-list";
import Image from "next/image";

const AppIntro = () => {
  const content = {
    "header-p1": "SAPLING - TPGS Platforms",
    description: `
    Tropical Poultry Genetics Solutions (TPGS): Delivering farmer preferred, productive and ecologically
    adapted poultry to smallholders. The project will build on the gains of ACGG and its bridging phase that
    concluded in April 2022. In addition, the new phase will benefit from on-going activities of the Asian
    Chicken Genetic Gains (AsCGG) project in South-East Asia. This new phase shifts the focus towards
    impact, intervention through the establishment of new partnerships, and the close involvement of
    investors. It will have more emphasis on local chicken breed development and conservation. This three-
    year project will run as part of the One CGIAR initiative (SAPLING). TPGS is working in countries outside
    of SAPLING such as Cambodia and Nigeria.
    `,
    description2: `
    The initiative Sustainable Animal Productivity for Livelihoods, Nutrition and Gender Inclusion (SAPLING)
is a CGIAR initiative focusing on sustainable animal productivity. This initiative aims to contribute to
transforming livestock sectors in target countries to make them more productive, resilient, equitable
and sustainable. The initiative is working in seven countries located in East Africa (Ethiopia, Kenya,
Tanzania, Uganda), West Africa (Mali), Southeast Asia (Vietnam) and South Asia (Nepal) on 15 livestock
value chains in total.`,
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
            {/* <Typography
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
            </Typography> */}
          </Box>
          {/* <AppList /> */}
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            <Image
              alt="Chickens Image"
              src="/images/chickens_image.jpg"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto", marginBottom: "20px" }}
            />
            {/* <img
              src="/images/chickens_image.jpg"
              width={"100%"}
              style={{ marginBottom: "20px" }}
            /> */}
          </Box>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            paragraph={true}
          >
            {content["description2"]}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AppIntro;
