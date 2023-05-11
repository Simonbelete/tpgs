import React from "react";
import styled from "@emotion/styled";
import { Container, Typography, Box, Button } from "@mui/material";

// const classes = {
//   section: {
//     backgroundImage: 'url("nereus-assets/img/bg/pattern2.png")',
//     backgroundRepeat: "no-repeat",
//     backgroundSize: "cover",
//     backgroundColor: theme.palette.primary.dark,
//   },
//   description: {
//     color: theme.palette.background.secondary,
//   },
// };

const Section = styled.section`
  background-image: url("https://placehold.co/600x400/png");
  background-repeat: no-repeat;
  background-size: cover;
  background-color: ${({ theme }) => theme.palette.primary.main};
`;

const SectionDescription = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary.main};
`;

const SignUpNowCTA = ({ ...props }) => {
  const content = {
    "header-p1": "Donec lacinia",
    "header-p2": "turpis non sapien lobortis pretium",
    description:
      "But in a much more real sense, I had no idea what to do. No, no, no. I don't wanna hear moaning. This is a good day.",
    "primary-action": "Action",
    "secondary-action": "Action",
    ...props.content,
  };

  return (
    <Section>
      <Container maxWidth="sm">
        <Box py={10} textAlign="center" color="common.white">
          <Typography variant="h3" component="h3" gutterBottom={true}>
            <Typography color="secondary" variant="h3" component="span">
              {content["header-p1"]}{" "}
            </Typography>
            <Typography variant="h3" component="span">
              {content["header-p2"]}
            </Typography>
          </Typography>
          <Container maxWidth="sm">
            <SectionDescription variant="subtitle1" paragraph={true}>
              {content["description"]}
            </SectionDescription>
          </Container>
          <Box mt={3}>
            <Button variant="contained" color="secondary">
              {content["primary-action"]}
            </Button>
          </Box>
        </Box>
      </Container>
    </Section>
  );
};

export default SignUpNowCTA;
