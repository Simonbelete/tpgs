import React, { useEffect } from "react";
import {
  Card,
  Container,
  Stack,
  Paper,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import { Breadcrumbs } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { CreateLayout } from "@/layouts";
import { SeoHead } from "@/seo";
import { ExportModal, ImportButton } from "@/lib/crud";
import { chickenApi } from "@/features/chickens/services";
import { hatcheryApi } from "@/features/hatchery/services";
import { houseApi } from "@/features/houses/services";
import { penApi } from "@/features/pen/services";
import _ from "lodash";

const ChickenExport = ({ url, name }: { url?: string; name: string }) => {
  return (
    <ExportModal
      url={""}
      fullUrl={url ? `/chickens/export${url}` : "/chickens/export"}
      fields={{
        chicken: {
          endpoint: chickenApi.endpoints.getChickens,
          label: "Chicken",
          md: 12,
          dataKey: "display_name",
        },
        hatchery: {
          endpoint: hatcheryApi.endpoints.getHatchery,
          label: "hatchery",
          md: 12,
          dataKey: "display_name",
        },
        house: {
          endpoint: houseApi.endpoints.getHouses,
          label: "House",
          md: 12,
          dataKey: "display_name",
        },
        pen: {
          endpoint: penApi.endpoints.getPens,
          label: "Pen",
          md: 12,
          dataKey: "display_name",
        },
        generation: {
          label: "Generation",
          placeholder: "Generation",
          md: 12,
        },
      }}
      beforeSubmit={(values) => {
        return {
          id: _.get(values.chicken, "id", null),
          hatchery: _.get(values.hatchery, "id", null),
          house: _.get(values.house, "id", null),
          pen: _.get(values.pen, "id", null),
          generation: _.get(values, "generation", null),
        };
      }}
      name={name}
    />
  );
};

const ExportChickensPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Cull Chicken" />
      <CreateLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <Container maxWidth="md">
          <Stack direction={"column"} spacing={2} alignItems={"flex-start"}>
            {/* Export Detail */}
            <Paper
              sx={{ px: 1, py: 0, mb: 1, width: "100%" }}
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
                  Export Chickens Detail
                </Typography>
                <ChickenExport name="Export" />
              </Grid>
            </Paper>
            {/* Export Weight */}
            <Paper
              sx={{ px: 1, py: 0, mb: 1, width: "100%" }}
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
                  Export Chickens Body Weight
                </Typography>
                <ChickenExport url="/weights" name="Export" />
              </Grid>
            </Paper>
            {/* Export Eggs */}
            <Paper
              sx={{ px: 1, py: 0, mb: 1, width: "100%" }}
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
                  Export Chickens Egg Production
                </Typography>
                <ChickenExport url="/eggs" name="Export" />
              </Grid>
            </Paper>
            {/* Export Feed */}
            <Paper
              sx={{ px: 1, py: 0, mb: 1, width: "100%" }}
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
                  Export Chickens Feed Intake
                </Typography>
                <ChickenExport url="/feeds" name="Export" />
              </Grid>
            </Paper>

            {/* Import Weight */}
            <Paper
              sx={{ px: 1, py: 0, mb: 1, width: "100%" }}
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
                  Import Chicken Body Weights
                </Typography>
                <ImportButton
                  full_url="/chickens/import/weights"
                  url="/chickens/import/weights"
                />
              </Grid>
            </Paper>

            <p>Import Chicken Detail</p>
            <p>Import Chickens Body Weight</p>
            <p>Import Chickens Egg Production</p>
            <p>Import Chickens Feed Intake</p>
            <p>Import Chickens Batch Feed Intake</p>
          </Stack>
        </Container>
      </CreateLayout>
    </>
  );
};

export default ExportChickensPage;
