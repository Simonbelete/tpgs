import {
  Grid,
  Box,
  Card,
  Typography
} from "@mui/material";
// Custom components
// Custom icons
import React from "react";

export default function Default({startContent, endContent, name, value, growth, growthName}: {startContent?: React.ReactNode, endContent?: React.ReactNode ,name: string, value: string, growth?: string, growthName?: string}) {
  return (
    <Card>
      <Grid
        sx={{
          my: 'auto',
          height: '100%',
          alignContent: "center",
          justifyContent: "center"
        }}>
        {startContent}

        <Box>
          <Typography>
            {name}
          </Typography>
          <Typography>
            {value}
          </Typography>
          {growth ? (
            <Box alignItems='center'>
              <Typography>
                {growth}
              </Typography>
              <Typography>
                {growthName}
              </Typography>
            </Box>
          ) : null}
        </Box>
        <Box>
          {endContent}
        </Box>
      </Grid>
    </Card>
  );
}