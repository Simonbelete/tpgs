import React, { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import { StatisticsCard, BarChartSkeleton } from "@/components";
import { Layout } from "plotly.js";
import dynamic from "next/dynamic";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <BarChartSkeleton />,
});

export const IngredientHeatmap = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    setData([
      {
        type: "choropleth",
        locationmode: "USA-states",

        autocolorscale: true,
        locations: ["AL", "ETH"],
        Z: [300],
        text: ["Belarus", "Moldova"],
      },
    ]);
  }, []);

  const layout: Partial<Layout> = {
    // width: "100%",
    height: 500,
    margin: { t: 0, l: 0, r: 0, b: 0 },
  };

  // var config = { mapboxAccessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN };

  return (
    <StatisticsCard title="Ingredients by country">
      <Plot data={data} layout={layout} />
    </StatisticsCard>
  );
};
