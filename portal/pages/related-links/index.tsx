import React, { useEffect, ReactElement, useState } from "react";
import _ from "lodash";
import { SeoHead } from "@/seo";
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Link,
  Stack,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  PrimaryMenu,
  SignUpNowCTA,
  PrimaryHero,
  AppIntro,
  AppsDescription,
} from "@/components";
import { ILRILogo } from "@/components/logos";
import { PrimaryFooter } from "@/components/footers";
import LaunchIcon from "@mui/icons-material/Launch";
import { useTheme } from "@mui/material/styles";

import publications from "@/data/publications";
import technicalReports from "@/data/technicalReports.json";
import trainingModules from "@/data/trainingModules.json";
import brochures from "@/data/brochures.json";
import { Inter } from "next/font/google";

// @ts-ignore
// const links = Object.groupBy(technicalReports, ({ category }) => category);
const links = _.groupBy(technicalReports, ({ category }) => category);

const LinkTitle = ({ children }: { children: string | ReactElement }) => {
  return (
    <>
      <Typography variant="h4" color="primary">
        {children}
      </Typography>
      <Divider />
    </>
  );
};

const RelatedLinks = () => {
  const theme = useTheme();

  return (
    <>
      <SeoHead title="Links publications and references" />
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100vh",
        }}
      >
        <Box sx={{ background: "#f5faf8" }}>
          <Container maxWidth="lg">
            <Box
              sx={{
                py: 1,
                px: 2,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Link
                href="https://www.ilri.org/"
                underline="none"
                variant="body1"
                color="black"
                target="_blank"
                style={{ color: "#495056" }}
              >
                ILRI
                <LaunchIcon sx={{ fontSize: 20, pl: 0.7 }} />
              </Link>
            </Box>
          </Container>
          <AppBar
            position="static"
            elevation={0}
            sx={{ background: "#f5faf8" }}
          >
            <Toolbar>
              <Container>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  {/* <Logo /> */}
                  <ILRILogo />
                  <Typography color="black">
                    SAPLING - TPGS Platforms
                  </Typography>
                  {/* <Box sx={{ flexGrow: 1 }} /> */}
                  <PrimaryMenu />
                </Box>
              </Container>
              <Stack direction="row" spacing={2}></Stack>
            </Toolbar>
          </AppBar>
        </Box>

        <Container maxWidth="md">
          <Box sx={{ height: 50 }} />

          <LinkTitle>Training Modules</LinkTitle>
          <Box ml={2} mt={3}>
            <ul
              style={{
                fontSize: "14px",
              }}
            >
              {trainingModules.map((e: any, i: any) => (
                <li style={{ marginBottom: "10px" }} key={i}>
                  <a href={e.link}>{e.title}</a>
                </li>
              ))}
            </ul>
          </Box>

          <Box sx={{ height: 15 }} />
          <LinkTitle>Technical Reports</LinkTitle>
          <Box ml={2}>
            {Object.keys(links).map((key: any, i: any) => (
              <>
                <Typography
                  variant="h6"
                  color={"text.primary"}
                  fontWeight={400}
                >
                  {key}
                </Typography>
                <ul
                  style={{
                    fontSize: "14px",
                  }}
                >
                  {links[key]?.map((e: any, j: any) => (
                    <li style={{ marginBottom: "10px" }} key={j}>
                      <a href={e.link}>{e.title}</a>
                    </li>
                  ))}
                </ul>
              </>
            ))}
          </Box>

          <Box sx={{ height: 50 }} />
          <LinkTitle>TPGS data portal</LinkTitle>
          <ul
            style={{
              fontSize: "14px",
            }}
          >
            <li style={{ marginBottom: "10px" }}>
              <a href="https://data.ilri.org/portal/dataset/tpgs">
                Tropical Poultry Genetic Solutions (TPGS) All Countries Data
              </a>
            </li>
          </ul>

          <Box sx={{ height: 50 }} />
          <LinkTitle>Publications</LinkTitle>

          <ol
            style={{
              fontFamily: "Molengo, Helvetica, Arial, sans-serif",
              fontSize: "16px",
              lineHeight: "1.428571429",
              color: "#333333",
            }}
          >
            {(publications || []).map((e: any, i: any) => (
              <li key={i}>
                <div
                  style={{
                    overflow: "scroll",
                    height: "100%",
                    fontSize: "16px",
                    fontWeight: 400,
                  }}
                  dangerouslySetInnerHTML={{ __html: e }}
                />
              </li>
            ))}
          </ol>

          <Box sx={{ height: 50 }} />

          <LinkTitle>Presentations and brochures</LinkTitle>
          <Box ml={2} mt={3}>
            <ul
              style={{
                fontSize: "14px",
              }}
            >
              {(brochures || []).map((e: any, i: any) => (
                <li key={i}>
                  <div
                    style={{
                      overflow: "scroll",
                      height: "100%",
                      fontSize: "16px",
                      fontWeight: 400,
                    }}
                    dangerouslySetInnerHTML={{ __html: e }}
                  />
                </li>
              ))}
            </ul>
          </Box>

          <Box sx={{ height: 50 }} />
        </Container>

        <Box sx={{ height: 100 }} />

        <footer
          style={{
            marginTop: "auto",
            background: theme.palette.secondary.dark,
          }}
        >
          <Container>
            <PrimaryFooter />
          </Container>
        </footer>
      </main>
    </>
  );
};

RelatedLinks.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default RelatedLinks;
