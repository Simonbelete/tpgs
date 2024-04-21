import React, { useEffect, useState } from "react";
import { useGetMortalityRateQuery } from "./services";
import { PieChartSkeleton, StatisticsCard } from "@/components";
import dynamic from "next/dynamic";
import _ from "lodash";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <PieChartSkeleton />,
});

const MortalityRate = ({ data }: { data: any }) => {
  const [chartData, setchartData] = useState<any>([]);

  useEffect(() => {
    const y_value = [];
    const y_percentage = [];

    const y2_value = [];
    const y2_percentage = [];

    const x = data?.results.map((e: any) => e.week);

    for (let i = 0; i < data?.results.length; i++) {
      y_value.push(data?.results[i].mortality.total);
      y_percentage.push(data?.results[i].mortality.rate);

      y2_value.push(data?.results[i].livability.total);
      y2_percentage.push(data?.results[i].livability.rate);
    }

    setchartData([
      {
        x: x,
        y: y_percentage,
        text: y_percentage,
        type: "scatter",
        name: "Mortality rate",
        marker: { color: "rgb(255, 127, 14)" },
      },
      {
        x: x,
        y: y_value,
        yaxis: "y1",
        text: y_value,
        type: "bar",
        name: "Mortality number",
        marker: { color: "rgb(26, 118, 255)" },
      },
      {
        x: x,
        y: y2_value,
        text: y2_value,
        type: "bar",
        name: "Livability number",
        marker: { color: "rgb(55, 83, 109)" },
      },
      {
        x: x,
        y: y2_percentage,
        text: y2_percentage,
        type: "scatter",
        name: "Livability rate",
        marker: { color: "rgb(44, 160, 44)" },
      },
    ]);
  }, [data]);

  return (
    <>
      <Plot
        layout={{
          title: "Mortality",
          height: 500,
          xaxis: {
            title: "Age in week",
            dtick: 1,
          },
          yaxis: {
            title: "Mortality & Livability",
          },
        }}
        config={{ responsive: true }}
        style={{ width: "100%" }}
        data={chartData}
      />
    </>
  );
};

export default MortalityRate;
