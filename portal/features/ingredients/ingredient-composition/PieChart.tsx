import React from "react";
import dynamic from "next/dynamic";
import { BarChartSkeleton } from "@/components";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <BarChartSkeleton />,
});

const PieChart = ({
  data,
}: {
  data: { values: number[]; labels: string[] };
}) => {
  return (
    <Plot
      data={[
        {
          values: data.values,
          labels: data.labels,
          type: "pie",
        },
      ]}
      layout={{ title: "Ingredient's nutrient compostion", height: 500 }}
      config={{ responsive: true }}
      style={{ width: "100%" }}
    />
  );
};

export default PieChart;
