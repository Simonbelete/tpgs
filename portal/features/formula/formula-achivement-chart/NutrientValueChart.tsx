import React from "react";
import Plot from "react-plotly.js";

const FormulationAchivementChart = ({ data }: { data: any }) => {
  return (
    <Plot
      data={data}
      layout={{ title: "Nutrient Ration vs Requirement", height: 500 }}
      config={{ responsive: true }}
      style={{ width: "100%" }}
    />
  );
};

export const FormulationAchivementChartSkeleton = () => {
  return <></>;
};

export default FormulationAchivementChart;
