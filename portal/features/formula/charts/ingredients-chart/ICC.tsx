/**
 * Ingredients Contribuation chart
 * Pie Chart
 */
import React from "react";
import Plot from "react-plotly.js";

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
