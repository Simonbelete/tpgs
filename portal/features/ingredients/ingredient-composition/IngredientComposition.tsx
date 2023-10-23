import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Divider,
  Stack,
  Typography,
  Tooltip,
  Chip,
  Grid,
} from "@mui/material";
import dynamic from "next/dynamic";
import { Skeleton } from "@mui/material";
import { useGetIngredientNutrientsQuery } from "../services";
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

const IngredientComposition = ({ id }: { id: number }) => {
  const [chartData, setChartData] = useState<{
    values: number[];
    labels: string[];
  }>({
    values: [],
    labels: [],
  });

  const [chartData2, setChartData2] = useState<any>([]);

  const { data, isLoading, status } = useGetIngredientNutrientsQuery({
    id,
    query: {},
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
      labels.push((response[i].nutrient as Nutrient).name || "");
      values.push(response[i].value);

      x1.push(
        `${(response[i].nutrient as Nutrient).name} [${
          (response[i].nutrient as Nutrient).unit || ""
        }]` || ""
      );
      y1.push(response[i].value);

      x2.push(
        `${(response[i].nutrient as Nutrient).name} [${
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
      <Grid item xs={4}>
        <StatisticsCard title="Ingredient Compostions">
          <Chart data={chartData} />
        </StatisticsCard>
      </Grid>
      <Grid item xs={8}>
        <StatisticsCard title="Ingredient Dry matter vs As feed comparation">
          <BarChart data={chartData2} />
        </StatisticsCard>
      </Grid>
    </Grid>
  );
};

export default IngredientComposition;
