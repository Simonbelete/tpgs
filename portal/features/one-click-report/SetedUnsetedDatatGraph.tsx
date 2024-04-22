import React, { useEffect, useState } from "react";
import { useGetMortalityRateQuery } from "./services";
import { PieChartSkeleton, StatisticsCard } from "@/components";
import dynamic from "next/dynamic";
import _ from "lodash";
import { Box } from "@mui/material";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <PieChartSkeleton />,
});
const SetedUnsetedDatatGraph = ({ data }: { data: any }) => {
  const [chartData, setchartData] = useState<any>([]);
  const [chartData2, setchartData2] = useState<any>([]);
  const [chartData3, setchartData3] = useState<any>([]);
  const [chartData4, setchartData4] = useState<any>([]);

  useEffect(() => {
    const x: any = [[], []];

    data?.results.forEach((e: any) => {
      x[0].push(e.week);
      x[0].push(e.week);
      x[0].push(e.week);

      x[1].push("Weight");
      x[1].push("Feed");
      x[1].push("Eggs");
    });

    const trace1: any = {
      x: x,
      y: [],
      text: [],
      name: "Collected",
      type: "bar",
      marker: { color: "rgb(10, 81, 126)" },
    };

    const trace2: any = {
      x: x,
      y: [],
      text: [],
      name: "Not Collected",
      type: "bar",
      marker: { color: "rgb(226, 92, 89)" },
    };

    for (let i = 0; i < data?.results.length; i++) {
      trace1.y.push(data?.results[i]?.body_weight?.recorded);
      trace1.y.push(data?.results[i]?.feed_intake?.recorded);
      trace1.y.push(data?.results[i]?.eggs?.recorded);

      trace1.text.push(data?.results[i]?.body_weight?.recorded);
      trace1.text.push(data?.results[i]?.feed_intake?.recorded);
      trace1.text.push(data?.results[i]?.eggs?.recorded);

      trace2.y.push(data?.results[i]?.body_weight?.missing);
      trace2.y.push(data?.results[i]?.feed_intake?.missing);
      trace2.y.push(data?.results[i]?.eggs?.missing);

      trace2.text.push(data?.results[i]?.body_weight?.missing);
      trace2.text.push(data?.results[i]?.feed_intake?.missing);
      trace2.text.push(data?.results[i]?.eggs?.missing);
    }

    console.log(trace1);

    setchartData([trace1, trace2]);
    // chartData2([t2_1, t2_2]);
  }, [data]);

  return (
    <Box>
      <Plot
        layout={{
          title: "Body weight data collection",
          height: 500,
          xaxis: {
            ticklen: 1,
            dividerwidth: 1,
            type: "multicategory",
          },
          yaxis: {
            title: "",
          },
          barmode: "stack",
        }}
        config={{ responsive: true }}
        style={{ width: "100%" }}
        data={chartData}
      />
    </Box>
  );
};

export default SetedUnsetedDatatGraph;
