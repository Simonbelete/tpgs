import React from "react";
import { Container, Grid, Typography, Box, Button, Stack } from "@mui/material";
import Link from "next/link";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

interface AppsDescriptionData {
  image: string;
  title1: string;
  title2: string;
  description: string;
  link: string;
  linkAndroid?: string;
}

const AppsDescription = () => {
  const description =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,";

  const data: AppsDescriptionData[] = [
    {
      title1: "What is the Nutrition",
      title2: "Education app for?",
      image: "/screenshots/nutrition_education_mobile_app.png",
      description: description,
      link: "/login",
      linkAndroid: "asf",
    },
    {
      title1: "What is the Feed",
      title2: "Formulation app for?",
      image: "/screenshots/feed_app_screenshot.png",
      description: description,
      link: "/login",
    },
    {
      title1: "What is the Breeding",
      title2: "Data Management app for?",
      image: "/screenshots/breeding_data_mangement.png",
      description: description,
      link: "/login",
    },
  ];

  return (
    <>
      {data.map((e, key) => (
        <Box
          key={key}
          sx={{
            background: key % 2 === 0 ? "#f5faf8" : "#fff",
            border: "1px solid #f5faf8",
          }}
        >
          <Container maxWidth="lg" sx={{ my: 10, py: 5 }}>
            <Grid container spacing={10}>
              <Grid item xs={12} md={6}>
                <Link href={e.image}>
                  <img src={e.image} width={"100%"} />
                </Link>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h3" component="h3">
                  {e.title1}
                </Typography>
                <Typography variant="h3" component="h3">
                  {e.title2}
                </Typography>
                <Typography sx={{ mt: 5 }}>{description}</Typography>
                <Stack direction={"row"} spacing={2} sx={{ mt: 5 }}>
                  <Link href={e.link}>
                    <Button
                      variant="contained"
                      endIcon={<KeyboardArrowRightIcon />}
                    >
                      Start Now
                    </Button>
                  </Link>
                  {e.linkAndroid && (
                    <>
                      <Link href={e.linkAndroid}>
                        <Button variant="outlined">Download Android</Button>
                      </Link>
                      <Link href={e.linkAndroid}>
                        <Button variant="text" size="small" color="secondary">
                          Download apk
                        </Button>
                      </Link>
                    </>
                  )}
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </Box>
      ))}
    </>
  );
};

export default AppsDescription;
