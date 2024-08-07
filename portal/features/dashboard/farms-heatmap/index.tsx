import React, { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import { StatisticsCard } from "@/components";
// import { Layout } from "plotly.js";
import dynamic from "next/dynamic";
import { BarChartSkeleton } from "@/components";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <BarChartSkeleton />,
});

const FarmsHeatmap = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    setData([
      {
        type: "choroplethmapbox",
        geojson:
          "https://raw.githubusercontent.com/python-visualization/folium/master/examples/data/us-states.json",
        locations: ["AL"],
        z: [300],
        // zmin: 25, zmax: 280, colorbar: {y: 0, yanchor: "bottom", title: {text: "US states", side: "right"}}
        showscale: false,
      },
    ]);
  }, []);

  const layout: Partial<any> = {
    mapbox: {
      // style: 'dark',
      center: { lon: 38, lat: 9 },
      zoom: 0.6,
    },
    width: 709,
    height: 500,
    margin: { t: 0, l: 0, r: 0, b: 0 },
    showlegend: false,
  };

  var config = { mapboxAccessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN };

  return (
    <StatisticsCard title="Farms Location">
      <Plot data={data} layout={layout} config={config} />
    </StatisticsCard>
  );
};

export default FarmsHeatmap;
