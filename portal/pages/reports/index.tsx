import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { RegionList } from "@/features/regions";
import { SeoHead } from "@/seo";
import { Grid, Box, Container, Typography, Stack, Button } from "@mui/material";
import { useRouter } from "next/router";

interface Report {
  title: string;
  description: string;
  link: string;
}

const ReportsPage = () => {
  const { breadcrumbs } = useBreadcrumbs();
  const router = useRouter();

  const reports: Report[] = [
    {
      title: "Egg productive laying",
      description:
        "Shows the actual percentage of productive laying chickens over a period of time",
      link: "/reports/egg-productive",
    },
    {
      title: "Hen-Day Egg Production (HDEP)",
      description: "",
      link: "/reports/hdep",
    },
    {
      title: "Hen-Housed Egg Production (HHEP)",
      description: "",
      link: "/reports/hhep",
    },
    {
      title: "Egg Mass",
      description:
        "The use of egg mass rather than egg numbers will lead to better comparisons of flocks or strains of birds.",
      link: "/reports/egg-mass",
    },
    {
      title: "Egg Grading",
      description: "",
      link: "/reports/egg-grading",
    },
    {
      title: "Average Egg Weight",
      description: "",
      link: "/reports/avg-egg-weight",
    },
    {
      title: "Chicken Sex Percentage Distribution",
      description: "",
      link: "/reports/gender-percentage-distribution",
    },
    {
      title: "Growth Performance",
      description: "",
      link: "/reports/growth-performance",
    },
    {
      title: "Feed consumption by body weight",
      description: "",
      link: "/reports/feed-by-weight",
    },
  ];

  return (
    <>
      <SeoHead title="Reporting" />
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Reports</Typography>}
      >
        <Container maxWidth="lg">
          <Grid container>
            {reports.map((e, i) => (
              <Grid
                key={i}
                item
                direction={"column"}
                xs={12}
                px={3}
                py={2}
                sx={{
                  bgcolor: "#fff",
                  mb: "15px",
                  boxShadow:
                    "0 0 #000 ,0px 1px 2px 0px rgba( 21 21 21 / 0.08 ),0px 2px 4px 0px rgba( 21 21 21 / 0.08 )",
                  border: "1px solid #CDD7E1",
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Stack>
                  <Typography
                    variant="h5"
                    fontWeight={600}
                    color={"link.primary"}
                  >
                    {e.title}
                  </Typography>
                </Stack>
                <Typography mt={2} variant="body2" color={"secondary.main"}>
                  {e.description}
                </Typography>
                <Box mt={1} display={"flex"} justifyContent={"end"}>
                  <Button
                    disableElevation
                    size="small"
                    variant="contained"
                    sx={{ textTransform: "none" }}
                    onClick={() => router.push(e.link)}
                  >
                    Generate report
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </ListLayout>
    </>
  );
};

export default ReportsPage;
