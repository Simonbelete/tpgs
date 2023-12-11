import React, { ReactElement } from "react";
import { Typography, Grid, Box, IconButton } from "@mui/material";
import { Stats, FeedStats } from "@/features/dashboard";
import dynamic from "next/dynamic";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { NotificationCard } from "@/features/notification";
import {
  FarmsHeatmapSkeleton,
  StartFormulatingCard,
} from "@/features/dashboard";
import { SeoHead } from "@/seo";
import {
  GenderPercentageDistribution,
  BreedDistribution,
  ChickenAgeGroup,
} from "@/features/analyses";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";

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
                <Grid item>
                  <FeedStats />
                </Grid>
                <Grid item xs={12} md={6} sx={{ px: 0 }}>
                  <StartFormulatingCard />
                </Grid>
                <Grid item xs={12} md={6}>
                  <NotificationCard />
                </Grid>
              </>
            ) : (
              <>
                <Grid item>
                  <Stats />
                </Grid>
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
