import React, { ReactElement } from "react";
import { Typography, Grid, Box } from "@mui/material";
import { Stats, FeedStats } from "@/features/dashboard";
import dynamic from "next/dynamic";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { NotificationCard } from "@/features/notification";
import { FarmsHeatmapSkeleton } from "@/features/dashboard";
import { SeoHead } from "@/seo";
import {
  GenderPercentageDistribution,
  BreedDistribution,
  ChickenAgeGroup,
} from "@/features/analyses";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { IngredientHeatmap } from "@/features/analyses";

const FarmsHeatmapComponent = dynamic(
  () => import("../../features/dashboard/farms-heatmap"),
  {
    ssr: false,
    loading: () => <FarmsHeatmapSkeleton />,
  }
);

const DashboardPage = () => {
  const { breadcrumbs } = useBreadcrumbs();
  const tenant = useSelector((state: RootState) => state.tenant);

  return (
    <>
      <SeoHead title="Dashboard" />
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Dashboard</Typography>}
      >
        <Box sx={{ px: 2 }}>
          <Grid container spacing={5}>
            {tenant.name == "public" ? (
              <>
                <Grid item spacing={3}>
                  <FeedStats />
                </Grid>
                <Grid item xs={12} sx={{ px: 0 }}>
                  {/* <IngredientHeatmap /> */}
                </Grid>
              </>
            ) : (
              <>
                <Grid item spacing={3}>
                  <Stats />
                </Grid>
                {/* <Grid container item spacing={3}>
                  <Grid item xs={8} sx={{ px: 0 }}>
                    <FarmsHeatmapComponent />
                  </Grid>
                  <Grid item xs={4} sx={{ p: 0 }}>
                    <NotificationCard />
                  </Grid>
                </Grid> */}
                <Grid container item spacing={3}>
                  <Grid item xs={6}>
                    <BreedDistribution compact={true} />
                  </Grid>
                  <Grid item xs={6}>
                    <NotificationCard />
                  </Grid>
                </Grid>
                <Grid container item spacing={3}>
                  <Grid item xs={8}>
                    <ChickenAgeGroup compact={true} />
                  </Grid>
                  <Grid item xs={4}>
                    <GenderPercentageDistribution compact={true} />
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      </ListLayout>
    </>
  );
};

export default DashboardPage;
