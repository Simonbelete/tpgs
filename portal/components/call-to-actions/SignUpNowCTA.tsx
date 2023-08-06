import React from "react";
import styled from "@emotion/styled";
import { Container, Typography, Box, Button } from "@mui/material";

// background-image: url("https://placehold.co/600x400/png");
// background-image: url("/images/chi1.jpeg");
//   background-repeat: no-repeat;
//   background-size: cover;
//   background-color: ${({ theme }) => theme.palette.primary.main};
const Section = styled.section`
  background-repeat: no-repeat;
  background: linear-gradient(to top, #2e4639, #1f484180),
    url("/images/chi1.jpeg");
  background-size: cover;
`;

const SectionDescription = styled(Typography)`
  color: ${({ theme }) => theme.palette.white};
`;

const SignUpNowCTA = ({ ...props }) => {
  const content = {
    "header-p1": "Lorem Ipsum",
    "header-p2":
      " is simply dummy text of the printing and typesetting industry.",
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
