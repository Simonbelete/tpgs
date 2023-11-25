import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import dynamic from "next/dynamic";
import { Skeleton } from "@mui/material";
import { useGetNutrientsOfRequirementQuery } from "../services";
import { Nutrient } from "@/models";
import { StatisticsCard } from "@/components";

const Chart = dynamic(() => import("./PieChart"), {
  ssr: false,
  loading: () => <Skeleton variant="circular" width={150} height={150} />,
});

const BarChart = dynamic(() => import("./BarChart"), {
  ssr: false,
  loading: () => <Skeleton width={150} height={150} />,
});

const RequirementComposition = ({ id }: { id: number }) => {
  const [chartData, setChartData] = useState<{
    values: number[];
    labels: string[];
  }>({
    values: [],
    labels: [],
  });

  const [chartData2, setChartData2] = useState<any>([]);

  const { data, isLoading, status } = useGetNutrientsOfRequirementQuery({
    id,
    // TODO:
    // query: { nutrient_group_not: "Energy", limit: 100 },
    query: { limit: 100 },
  });

  useEffect(() => {
    const labels: string[] = [];
    const values: number[] = [];

    const x1: string[] = [];
    const y1: number[] = [];

    const x2: string[] = [];
    const y2: number[] = [];

    const response = data?.results || [];

    for (let i = 0; i < response.length; i += 1) {
      labels.push((response[i].nutrient as Nutrient).abbreviation || "");
      values.push(response[i].value);

      x1.push(
        `${(response[i].nutrient as Nutrient).abbreviation} [${
          (response[i].nutrient as Nutrient).unit || ""
        }]` || ""
      );
      y1.push(response[i].value);

      x2.push(
        `${(response[i].nutrient as Nutrient).abbreviation} [${
          (response[i].nutrient as Nutrient).unit || ""
        }]` || ""
      );
      y2.push(response[i].as_feed_value);
    }

    setChartData({ values, labels });
    setChartData2([
      { x: x1, y: y1, type: "bar", name: "As dry matter" },
      { x: x2, y: y2, type: "bar", name: "As feed" },
    ]);
  }, [data]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <StatisticsCard title="Requirement Dry matter vs As feed comparation">
          <BarChart data={chartData2} />
        </StatisticsCard>
      </Grid>
      <Grid item xs={12}>
        <StatisticsCard title="Requirement Compostions">
          <Chart data={chartData} />
        </StatisticsCard>
      </Grid>
    </Grid>
  );
};

export default RequirementComposition;
