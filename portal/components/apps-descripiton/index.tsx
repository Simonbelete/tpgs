import React from "react";
import { Container, Grid, Typography, Box, Button, Stack } from "@mui/material";
import Link from "next/link";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Image from "next/image";

interface AppsDescriptionData {
  image: string;
  title1: string;
  title2: string;
  description: string;
  link?: string;
  linkAndroid?: string;
}

const AppsDescription = () => {
  const description =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,";

  const data: AppsDescriptionData[] = [
    {
      title1: "What is the Nutrition",
      title2: "Literacy app?",
      image: "/screenshots/nutrition_education_mobile_app.png",
      description: `
      A mobile nutrition literacy app is invaluable, extending an array of benefits to users beyond merely
promoting healthy eating habits. This farmer-friendly application, thoughtfully translated into three
languages—English, Amharic, and Swahili—exemplifies inclusivity and accessibility, ensuring that a
diverse audience of farmers can harness its wealth of knowledge. This comprehensive app transcends
the conventional boundaries of nutritional education by imparting essential information on many topics.
Through its user-friendly interface, the app endeavors to enlighten farmers on the fundamentals of
nutrition, elucidating the nuances of a balanced diet and providing insights into the significance of

macro and micronutrients. It further delineates the Recommended Daily Allowances (RDAs) of essential
vitamins and minerals, fostering a deep understanding of the nutritional requirements for optimal
health.`,
      link: "/nutrition-literacy",
      // linkAndroid: "asf",
    },
    {
      title1: "The poultry breeding",
      title2: "data App",
      image: "/screenshots/breeding_data_mangement.png",
      description: `
      This is a real time data collection application that can bring data collected from several countries and
      farms together and produces basic visualization of data for immediate use. It also provides data in the
      CSV form that the researchers can analyze using appropriate statistical methods and tools. It provides an
      opportunity to access data of several sources and geographies.
      `,
      link: "/login?from=/&to=/formulation/experimental",
    },
    {
      title1: "Feed formulation",
      title2: "application",
      image: "/screenshots/feed_app_screenshot.png",
      description: `
      This is a trial-and-error feed formulation application that used inputs from all project countries and
publicly available information. The feed formulation will enable smallholder farmers, public National
research institutes and universities use the app to formulate feed for their flock in their research and
teaching respectively.`,
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
                  <Image
                    alt=""
                    src={e.image}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </Link>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h3" component="h3">
                  {e.title1}
                </Typography>
                <Typography variant="h3" component="h3">
                  {e.title2}
                </Typography>
                <Typography sx={{ mt: 5 }}>{e.description}</Typography>
                <Stack direction={"row"} spacing={2} sx={{ mt: 5 }}>
                  {e.link && (
                    <Link href={e.link}>
                      <Button
                        variant="contained"
                        endIcon={<KeyboardArrowRightIcon />}
                      >
                        Start Now
                      </Button>
                    </Link>
                  )}
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
