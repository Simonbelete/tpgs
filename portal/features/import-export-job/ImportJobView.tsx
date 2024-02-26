import { ImportJob } from "@/models";
import React from "react";
import { Card } from "@/components";
import { Box, Stack, Typography, Grid, Chip } from "@mui/material";
import Link from "next/link";

const typeMapper = {
  DONE: {
    label: "Done",
    color: "success",
  },
  "DRY RUN": {
    label: "Dry Run",
    color: "warning",
  },
  START: {
    label: "Start",
    color: "info",
  },
  ERROR: {
    label: "Error",
    color: "error",
  },
};

export const ImportJobView = ({ data }: { data: ImportJob }) => {
  return (
    <>
      <Card title="Import Job Detail">
        <Grid container columns={16} spacing={1}>
          <Grid item xs={6}>
            <Stack gap={1} direction={"row"} alignItems={"center"}>
              <Typography fontWeight={600}>File:</Typography>
              <Link href="{data.file}" target="_blank">
                <Typography variant="caption" color="text.secondary">
                  {data.file}
                </Typography>
              </Link>
            </Stack>
          </Grid>

          <Grid item xs={6}>
            <Stack gap={1} direction={"row"} alignItems={"center"}>
              <Typography fontWeight={600}>Processing initiated:</Typography>
              <Typography variant="caption" color="text.secondary">
                {data.processing_initiated}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={6}>
            <Stack gap={1} direction={"row"} alignItems={"center"}>
              <Typography fontWeight={600}>File type:</Typography>
              <Typography variant="caption" color="text.secondary">
                {data.format}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={6}>
            <Stack gap={1} direction={"row"} alignItems={"center"}>
              <Typography fontWeight={600}>Error:</Typography>
              <Typography variant="caption" color="text.secondary">
                {data.errors}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={6}>
            <Stack gap={1} direction={"row"} alignItems={"center"}>
              <Typography fontWeight={600}>Uploaded on:</Typography>
              <Typography variant="caption" color="text.secondary">
                {data.uploaded_on}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={6}>
            <Stack gap={1} direction={"row"} alignItems={"center"}>
              <Typography fontWeight={600}>Resource:</Typography>
              <Typography variant="caption" color="text.secondary">
                {data.resource}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={6}>
            <Stack gap={1} direction={"row"} alignItems={"center"}>
              <Typography fontWeight={600}>Job status:</Typography>
              {data.job_status && (
                <Chip
                  variant="outlined"
                  // @ts-ignore
                  label={typeMapper[data.job_status].label}
                  size="small"
                  // @ts-ignore
                  color={typeMapper[data.job_status].color}
                />
              )}
            </Stack>
          </Grid>
        </Grid>
      </Card>

      <div
        style={{ overflow: "scroll", height: "100%" }}
        dangerouslySetInnerHTML={{ __html: data.report }}
      />
    </>
  );
};
