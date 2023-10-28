import React from "react";
import Plot from "react-plotly.js";

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
      layout={{ title: "Requirement's nutrient compostion", height: 500 }}
      config={{ responsive: true }}
      style={{ width: "100%" }}
    />
  );
};

export default PieChart;
