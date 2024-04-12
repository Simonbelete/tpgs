/**
 * Ingredients Contribuation chart
 * Pie Chart
 */
import React from "react";
import dynamic from "next/dynamic";
import { BarChartSkeleton } from "@/components";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <BarChartSkeleton />,
});

const ICC = ({ data }: { data: any }) => {
  return (
    <Plot
      data={data}
      layout={{
        title: "Ingredient Contribution",
        height: 500,
        barmode: "stack",
      }}
      config={{ responsive: true }}
      style={{ width: "100%" }}
    />
  );
};

export default ICC;
