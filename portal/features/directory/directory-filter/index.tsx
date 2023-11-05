import React from "react";
import { DirectoryDropdown } from "@/features/directory";
import { Card } from "@/components";
import { Box, Chip, Divider, Grid, Stack, Typography } from "@mui/material";
import { LabeledInput } from "@/components/inputs";
import Image from "next/image";

export const DirectoryFilter = () => {
  return (
    <>
      <Card title="Filters">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <DirectoryDropdown />
          </Grid>
          <Grid item xs={6}>
            <LabeledInput
              size="small"
              value={""}
              label={"Start Week"}
              placeholder={"Start Week"}
            />
          </Grid>
          <Grid item xs={6}>
            <LabeledInput
              size="small"
              value={""}
              label={"End Week"}
              placeholder={"End Week"}
            />
          </Grid>
        </Grid>
        <Divider sx={{ mt: 5 }} />
        <Box>
          <Stack direction={"column"} mt={3}>
            <Stack
              direction={"row"}
              divider={
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <Image
                    alt="slash_arrow"
                    src="/slash_forward_icon_134959.png"
                    height={26}
                    width={15}
                  />
                </Box>
              }
              spacing={0.5}
            >
              <Stack direction={"column"}>
                <Typography
                  variant="caption"
                  fontSize={"0.67rem"}
                  color="text.secondary"
                >
                  Farm
                </Typography>
                <Typography variant="caption" color="text.primary">
                  ILIR Ethiopia
                </Typography>
              </Stack>
              <Stack direction={"column"}>
                <Typography
                  variant="caption"
                  fontSize={"0.67rem"}
                  color="text.secondary"
                >
                  Breed
                </Typography>
                <Typography variant="caption" color="text.primary">
                  ILIR Ethiopia
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Card>
    </>
  );
};
