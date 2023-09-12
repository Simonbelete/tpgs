import React, { ReactElement } from "react";
import { Typography, Grid, Box } from "@mui/material";
import { Stats } from "@/features/dashboard";
import dynamic from "next/dynamic";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { NotificationCard } from "@/features/notification";

const FarmsHeatmapComponent = dynamic(
  () => import("../../features/dashboard/farms-heatmap"),
  {
    ssr: false,
    loading: () => <h1>Loading...</h1>
  }
);

const DashboardPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Nutrients</Typography>}
      >
        <Box sx={{px: 2}}>
         <Grid container spacing={5}>
            <Grid item spacing={3}>
              <Stats />
            </Grid>
            <Grid container item spacing={3}>
              <Grid item xs={8} sx={{px: 0}}>
                <FarmsHeatmapComponent />
              </Grid>
              <Grid item xs={4} sx={{p: 0}}>
                <NotificationCard />
              </Grid>
            </Grid>
            <Grid container item spacing={3}>
            </Grid>
        </Grid>
        </Box>
    </ListLayout>
   
    // <Box>
    // <Grid container spacing={10}>
    //   <Grid item xs>
    //     <ChickenStat />
    //   </Grid>
    //   <Grid container>
    //     <Grid item xs={6}>
    //       {/* <FarmsHeatmap /> */}
    //       <FarmsHeatmapComponent/>
    //     </Grid>
    //   </Grid>
    // </Grid>
    // </Box>
  );
};

export default DashboardPage;
