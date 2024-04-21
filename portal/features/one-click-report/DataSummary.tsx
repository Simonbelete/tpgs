import React, { useEffect, useState } from "react";
import { useGetMortalityRateQuery } from "./services";
import { PieChartSkeleton, StatisticsCard } from "@/components";
import dynamic from "next/dynamic";
import _ from "lodash";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <PieChartSkeleton />,
});

const DataSummary = ({ data }: { data: any }) => {
  const [chartData, setchartData] = useState<any>();

  useEffect(() => {
    const trace: any = {
      q1: [],
      median: [],
      q3: [],
      mean: [],
      lowerfence: [0.5, 0.5],
      upperfence: [9, 8],
      type: "box",
    };

    const x = data?.results.map((e: any) => e.week);

    for (let i = 0; i < data?.results.length; i++) {
      trace.q1.push(data?.results[i].body_weight.q1);
      trace.median.push(data?.results[i].body_weight.median);
      trace.q3.push(data?.results[i].body_weight.q3);
      trace.mean.push(data?.results[i].body_weight.mean);
      trace.lowerfence.push(data?.results[i].body_weight.min);
      trace.upperfence.push(data?.results[i].body_weight.max);
      trace.q1.push(data?.results[i].body_weight.q1);
      trace.q1.push(data?.results[i].body_weight.q1);
    }

    setchartData([trace]);
  }, [data]);

  return (
    <Plot
      layout={{
        title: "Mortality",
        height: 500,
        boxmode: "group",
      }}
      config={{ responsive: true }}
      style={{ width: "100%" }}
      data={chartData}
    />
  );
};

export default DataSummary;
