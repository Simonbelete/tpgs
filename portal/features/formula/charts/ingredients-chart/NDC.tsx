/**
 * Nutrients Distribution Chart
 * Represented in Stacked Chart
 */
import React from "react";
import Plot from "react-plotly.js";

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
