import React from "react";
import dynamic from "next/dynamic";
import { BarChartSkeleton } from "@/components";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <BarChartSkeleton />,
});

const BarChart = ({ data }: { data: any }) => {
  return (
    <Plot
      data={data}
      layout={{
        title: "Requirement Dry matter vs As feed comparation",
        height: 500,
      }}
      config={{ responsive: true }}
      style={{ width: "100%" }}
    />
  );
};

export default BarChart;
