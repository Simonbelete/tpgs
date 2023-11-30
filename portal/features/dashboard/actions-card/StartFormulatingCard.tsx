import React from "react";
import {
  CardContent,
  Stack,
  Button,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import Link from "next/link";

export const StartFormulatingCard = () => {
  return (
    <Box
      sx={{
        borderRadius: "16px",
        background: "#D3F2E6",
        px: 3,
        py: 2,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <Stack justifyContent="space-between" sx={{ height: "80%" }}>
            <Box>
              <Typography
                color="#008a3f"
                variant="h4"
                fontWeight={600}
                sx={{ pb: 1 }}
              >
                Start <br /> Formulating
              </Typography>
              <Typography variant="caption" color="#008a3f">
                Start Formulating
              </Typography>
            </Box>
            <Box>
              <Link href="/formulation/experimental">
                <Button
                  variant="contained"
                  disableElevation
                  // size="small"
                  sx={{ mt: 3 }}
                >
                  Start Now!
                </Button>
              </Link>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs>
          <img src="/images/feed_martix.png" width={400} />
        </Grid>
      </Grid>
    </Box>
  );
};
