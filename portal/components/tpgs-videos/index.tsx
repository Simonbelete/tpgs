import React from "react";
import { Container, Grid, Stack, Box, Typography } from "@mui/material";
import VideoJS from "./videojs";

export const TpgsVideos = () => {
  const videos = [
    {
      url: "https://tpgs.ilri.org/data/Video_2024-11-01_%206.31.01%20AM.mp4",
      title: "",
    },
    {
      url: "https://tpgs.ilri.org/data/cgiar_ethiopia_video_1_corrected.mp4",
      title: "",
    },
  ];

  const playerRef = React.useRef(null);

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;
  };

  return (
    <Container>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Box my="auto">
            <Typography variant="h4" component="h4">
              TPGS CONSULT AND UNDERTAKINGS
            </Typography>
            {/* <Typography
              variant="subtitle1"
              color="textSecondary"
              paragraph={true}
            >
              DESC
            </Typography> */}
          </Box>
        </Grid>
        <Grid item xs={12} container spacing={3}>
          {videos.map((e, i) => (
            <Grid key={i} item xs={12} md={6}>
              <VideoJS
                options={{
                  autoplay: false,
                  controls: true,
                  responsive: true,
                  fluid: true,
                  sources: [
                    {
                      src: e.url,
                      type: "video/mp4",
                    },
                  ],
                }}
                onReady={handlePlayerReady}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};
