/**
 * Nutrients Distribution Chart
 * Represented in Stacked Chart
 */
import React from "react";
import dynamic from "next/dynamic";
import { BarChartSkeleton } from "@/components";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <BarChartSkeleton />,
});

const NDC = ({ data }: { data: any }) => {
  return (
    <Plot
      data={data}
      layout={{
        title: "Nutrient distribution chart",
        height: 500,
        barmode: "stack",
      }}
      config={{ responsive: true }}
      style={{ width: "100%" }}
    />
  );
};

export default NDC;
