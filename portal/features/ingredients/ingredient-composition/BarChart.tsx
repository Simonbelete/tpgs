import React from "react";
import Plot from "react-plotly.js";

const BarChart = ({ data }: { data: any }) => {
  return (
    <Plot
      data={data}
      layout={{
        title: "Ingredient Dry matter vs As feed comparation",
        height: 500,
      }}
      config={{ responsive: true }}
      style={{ width: "100%" }}
    />
  );
};

export default BarChart;
