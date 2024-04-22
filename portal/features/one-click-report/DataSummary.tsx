import React, { useEffect, useState } from "react";
import { useGetMortalityRateQuery } from "./services";
import { PieChartSkeleton, StatisticsCard } from "@/components";
import dynamic from "next/dynamic";
import _ from "lodash";
import d3 from "d3";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <PieChartSkeleton />,
});

const DataSummary = ({ data }: { data: any }) => {
  const [chartData, setchartData] = useState<any>();

  useEffect(() => {
    const trace1: any = {
      q1: [],
      median: [],
      q3: [],
      mean: [],
      lowerfence: [],
      upperfence: [],
      type: "box",
      boxpoints: "all",
      name: "Body Weight",
      marker: {
        color: "rgb(212, 97, 116)",
      },
    };

    const trace2: any = {
      q1: [],
      median: [],
      q3: [],
      mean: [],
      lowerfence: [],
      upperfence: [],
      type: "box",
      boxpoints: "all",
      name: "Feed Intake",
      marker: {
        color: "rgb(208, 209, 149)",
      },
    };

    const trace3: any = {
      q1: [],
      median: [],
      q3: [],
      mean: [],
      lowerfence: [],
      upperfence: [],
      type: "box",
      boxpoints: "all",
      name: "No of eggs",
      marker: {
        color: "rgb(40, 208, 103)",
      },
    };

    const trace4: any = {
      q1: [],
      median: [],
      q3: [],
      mean: [],
      lowerfence: [],
      upperfence: [],
      type: "box",
      boxpoints: "all",
      name: "Average eggs weight",
      marker: {
        color: "rgb(137, 145, 211)",
      },
    };

    for (let i = 0; i < data?.results.length; i++) {
      trace1.q1.push(data?.results[i].body_weight["25%"]);
      trace1.median.push(data?.results[i].body_weight["50%"]);
      trace1.q3.push(data?.results[i].body_weight["75%"]);
      trace1.mean.push(data?.results[i].body_weight["mean"]);
      trace1.lowerfence.push(data?.results[i].body_weight["min"]);
      trace1.upperfence.push(data?.results[i].body_weight["max"]);

      trace2.q1.push(data?.results[i].feed_intake["25%"]);
      trace2.median.push(data?.results[i].feed_intake["50%"]);
      trace2.q3.push(data?.results[i].feed_intake["75%"]);
      trace2.mean.push(data?.results[i].feed_intake["mean"]);
      trace2.lowerfence.push(data?.results[i].feed_intake["min"]);
      trace2.upperfence.push(data?.results[i].feed_intake["max"]);

      trace3.q1.push(data?.results[i].eggs["25%"]);
      trace3.median.push(data?.results[i].eggs["50%"]);
      trace3.q3.push(data?.results[i].eggs["75%"]);
      trace3.mean.push(data?.results[i].eggs["mean"]);
      trace3.lowerfence.push(data?.results[i].eggs["min"]);
      trace3.upperfence.push(data?.results[i].eggs["max"]);

      trace4.q1.push(data?.results[i].eggs_weight["25%"]);
      trace4.median.push(data?.results[i].eggs_weight["50%"]);
      trace4.q3.push(data?.results[i].eggs_weight["75%"]);
      trace4.mean.push(data?.results[i].eggs_weight["mean"]);
      trace4.lowerfence.push(data?.results[i].eggs_weight["min"]);
      trace4.upperfence.push(data?.results[i].eggs_weight["max"]);
    }

    setchartData([trace1, trace2, trace3, trace4]);
  }, [data]);

  return (
    <Plot
      layout={{
        title: "Boundary",
        height: 500,
        boxmode: "group",
        xaxis: {
          title: "Age in week",
          dtick: 1,
        },
      }}
      config={{ responsive: true }}
      style={{ width: "100%" }}
      data={chartData}
    />
  );
};

export default DataSummary;
