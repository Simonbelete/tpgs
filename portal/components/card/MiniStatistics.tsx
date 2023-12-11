import React from "react";
import { Grid, Box, Card, Typography, ButtonBase, Avatar } from "@mui/material";
import Shadow from "../Shadow";
import { useTheme } from "@mui/material/styles";

export default function Default({
  startContent,
  endContent,
  color,
  name,
  value,
  growth,
  growthName,
}: {
  startContent?: React.ReactNode;
  color?: string;
  endContent?: React.ReactNode;
  name: string;
  value: string;
  growth?: string;
  growthName?: string;
}) {
  const theme = useTheme();

  return (
    <Shadow radius={"56px"}>
      <Grid container spacing={1} sx={{ width: 200, height: 90, py: 1, pl: 0 }}>
        <Grid item>
          <ButtonBase sx={{ width: 70, height: "100%" }}>
            <Avatar
              sx={{
                width: 56,
                height: 56,
                bgcolor: color || theme.palette.primary.main,
              }}
            >
              {startContent}
            </Avatar>
          </ButtonBase>
        </Grid>
        <Grid item xs sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography variant="overline" color="text.secondary">
                {name}
              </Typography>
              <Typography
                variant="h5"
                fontWeight="600"
                color={"text.primary"}
                gutterBottom
              >
                {value}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Shadow>
  );
}
