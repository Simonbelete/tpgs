import React, { useEffect, useState } from "react";
import Plot from 'react-plotly.js';
import { Paper } from "@mui/material";
import { StatisticsCard } from "@/components";

const FarmsHeatmap = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    setData([{
      type: "choropleth",
      geojson: "https://raw.githubusercontent.com/python-visualization/folium/master/examples/data/us-states.json",
      locations: ["AL"],
      z: [300],
      zmin: 25, zmax: 280, colorbar: {y: 0, yanchor: "bottom", title: {text: "US states", side: "right"}}
    }])
  }, [])
  
  const layout = {mapbox: {center: {lon: 38.763611, lat: 9.005401}, zoom: 4}, width: 500, height: 400};
  
  
  var config = {mapboxAccessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN};

  
  return (
    <StatisticsCard title="Farms Location">
      <Plot data={data} layout={layout} config={config} />
    </StatisticsCard>
  )
}

export default FarmsHeatmap;