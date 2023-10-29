import React, { useEffect, useState } from "react";
import siteMetadata from "@/data/siteMetadata";
import Head from "next/head";
import {
  Button,
  Container,
  Divider,
  Grid,
  Typography,
  Paper,
  IconButton,
  Box,
} from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";
import {
  startTour,
  destory,
  startFirstTimeOnboarding,
} from "@/features/onboarding";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { SearchInputIcon } from "@/components/inputs";
import { SeoHead } from "@/seo";

const HelpPage = () => {
  const cookies = new Cookies(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const [data, setData] = useState<Object[]>();

  const handleStartTour = () => {
    dispatch(startFirstTimeOnboarding());
  };

  const handleCancel = () => {
    dispatch(destory());
  };

  const handleStartHelp = (template: string) => {
    dispatch(startTour(template));
  };

  useEffect(() => {
    (async () => {
      const response = await fetch("/data/search.json");
      const data_json = await response.json();
      setData(_.sortBy(data_json, ["title"]));
    })();
  }, []);

  return (
    <>
      <SeoHead title="Help" />
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          item
          xs={12}
        >
          <Typography
            variant="h3"
            fontWeight={600}
            color={"text.primary"}
            sx={{ mb: 5 }}
          >
            Help
          </Typography>
          <IconButton size="small" onClick={handleStartTour}>
            <PlayCircleOutlineIcon />
          </IconButton>
        </Grid>
        <Grid
          container
          columns={{ xs: 1, md: 2 }}
          columnSpacing={4}
          spacing={4}
        >
          {data?.map((e: any, i) => (
            <Grid key={i} item xs sx={{ mb: 5 }}>
              <Typography
                sx={{ mb: 2 }}
                variant="overline"
                color="text.secondary"
              >
                {e.title}
              </Typography>
              {e.topics.map((t: any, j: any) => (
                <Paper
                  key={j}
                  sx={{ px: 1, py: 0 }}
                  elevation={6}
                  variant="outlined"
                >
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    item
                    xs={12}
                    sx={{}}
                  >
                    <Typography
                      variant="body2"
                      fontWeight={500}
                      color={"text.primary"}
                    >
                      {t.title}
                    </Typography>
                    <Button
                      size="small"
                      variant="text"
                      onClick={() => handleStartHelp(t.template)}
                    >
                      Get Started
                    </Button>
                  </Grid>
                </Paper>
              ))}
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default HelpPage;
