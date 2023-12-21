import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { RegionList } from "@/features/regions";
import { SeoHead } from "@/seo";
import {
  Grid,
  Box,
  Container,
  Typography,
  Stack,
  Button,
  IconButton,
  Paper,
} from "@mui/material";
import { useRouter } from "next/router";

interface Report {
  title: string;
  description: string;
  reports: Array<{
    title: string;
    description: string;
    link: string;
  }>;
}

const ReportsPage = () => {
  const { breadcrumbs } = useBreadcrumbs();
  const router = useRouter();

  const data: Report[] = [
    {
      title: "Mortality",
      description: "",
      reports: [
        {
          title: "Mortality",
          description: "",
          link: "/reports/mortality",
        },
        {
          title: "Livability",
          description: "",
          link: "/reports/livability",
        },
      ],
    },
    {
      title: "Body Weight",
      description: "",
      reports: [
        {
          title: "Body weight graph",
          description: "",
          link: "/reports/weight-graph",
        },
        {
          title: "Growth Performance",
          description: "",
          link: "/reports/growth-performance",
        },
      ],
    },
    {
      title: "Feed Intake",
      description: "",
      reports: [
        {
          title: "Feed intake graph",
          description: "",
          link: "/reports/feed-graph",
        },
        {
          title: "Feed consumption by body weight",
          description: "",
          link: "/reports/feed-by-weight",
        },
      ],
    },
    {
      title: "Chicken",
      description: "",
      reports: [
        {
          title: "Chicken Sex Percentage Distribution",
          description: "",
          link: "/reports/gender-percentage-distribution",
        },
      ],
    },
    {
      title: "Egg productive",
      description: "",
      reports: [
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
      ],
    },
  ];

  //

  // ];

  return (
    <>
      <SeoHead title="Reporting" />
      <ListLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <Container maxWidth="lg">
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            item
            xs={12}
          >
            <Typography
              variant="h3"
              fontWeight={600}
              color={"text.primary"}
              sx={{ mb: 5 }}
            >
              Reports
            </Typography>
          </Grid>
          <Grid
            container
            // columns={{ xs: 1, md: 1 }}
            columnSpacing={4}
            spacing={4}
          >
            {data?.map((e: any, i) => (
              <Grid key={i} item xs md={6} sx={{ mb: 5 }}>
                <Typography
                  sx={{ mb: 2 }}
                  variant="overline"
                  color="text.secondary"
                >
                  {e.title}
                </Typography>
                {e.reports.map((t: any, j: any) => (
                  <Paper
                    key={j}
                    sx={{ px: 1, py: 0, mb: 1 }}
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
                        {t.title}
                      </Typography>
                      <Button
                        size="small"
                        variant="text"
                        onClick={() => router.push(t.link)}
                      >
                        View
                      </Button>
                    </Grid>
                  </Paper>
                ))}
              </Grid>
            ))}
          </Grid>
          {/* <Grid container>
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
          </Grid> */}
        </Container>
      </ListLayout>
    </>
  );
};

export default ReportsPage;
