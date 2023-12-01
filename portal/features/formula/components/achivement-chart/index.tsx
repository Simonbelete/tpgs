import React from "react";
import Plot from "react-plotly.js";

const FormulationAchivementChart = ({ data }: { data: { x: any; y: any } }) => {
  return (
    <Plot
      divId="achivement-chart"
      data={[
        {
          x: data.x,
          y: data.y,
          type: "bar",
        },
      ]}
      layout={{ title: "Nutrient goal achievement out of 100%", height: 500 }}
      config={{ responsive: true }}
      style={{ width: "100%" }}
    />
  );
};

export const FormulationAchivementChartSkeleton = () => {
  return <></>;
};

export default FormulationAchivementChart;
