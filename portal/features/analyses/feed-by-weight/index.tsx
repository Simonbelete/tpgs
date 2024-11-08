import React, { useState } from "react";
import { DirectoryFilter, IndividualFilterProps } from "@/features/directory";
import { useLazyGetFeedByWeightQuery } from "../services";
import dynamic from "next/dynamic";
import { BarChartSkeleton } from "@/components";
import { Box } from "@mui/material";
import directoryToLabel from "@/util/directoryToLabel";
import { Directory, DirectoryFilterData } from "@/models";
import buildDirectoryQuery from "@/util/buildDirectoryQuery";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <BarChartSkeleton />,
});

interface GraphProps {
  x: number[];
  y: number[];
  mode?: string;
  name?: string;
  yaxis?: string;
}

export const FeedByWeightAnalyses = () => {
  const [data, setData] = useState<any[]>([]);

  const [trigger] = useLazyGetFeedByWeightQuery();

  const handleOnBatchFilterApplay = async (directory: Directory) => {
    const query = buildDirectoryQuery(directory);
    const response = await trigger(query, false).unwrap();
    const chartData: GraphProps = {
      x: [],
      y: [],
      mode: "lines+markers",
      name: directoryToLabel(directory) + " (Body weight)",
    };

    const chartData2: GraphProps = {
      x: [],
      y: [],
      mode: "lines+markers",
      name: directoryToLabel(directory) + " (Feed intake)",
      yaxis: "y2",
    };

    if (response.results) {
      for (let val in response.results) {
        chartData.x.push(Number(response.results[val]["week"]) || 0);
        chartData.y.push(Number(response.results[val]["weight_average"]) || 0);

        chartData2.x.push(Number(response.results[val]["week"]) || 0);
        chartData2.y.push(Number(response.results[val]["feed_average"]) || 0);
      }
      setData([...data, chartData, chartData2]);
    }
  };

  const handleonBatchFilterRemove = (index: number) => {
    let newData = data.filter((e, i) => i != index * 2);
    newData = newData.filter((e, i) => i != index * 2);
    setData(newData);
  };

  const handleOnIndividualFilterApply = async (
    indvData: IndividualFilterProps
  ) => {
    const query = {
      chicken: indvData.chicken ? (indvData.chicken as any).id || null : null,
      start_week: indvData.start_week,
      end_week: indvData.end_week,
    };
    const response = await trigger(query, false).unwrap();
    const chartData: GraphProps = {
      x: [],
      y: [],
      mode: "lines+markers",
      name: indvData.chicken.display_name + " (Body weight)",
    };

    const chartData2: GraphProps = {
      x: [],
      y: [],
      mode: "lines+markers",
      name: indvData.chicken.display_name + " (Feed intake)",
      yaxis: "y2",
    };

    if (response.results) {
      for (let val in response.results) {
        chartData.x.push(Number(response.results[val]["week"]) || 0);
        chartData.y.push(Number(response.results[val]["weight_average"]) || 0);

        chartData2.x.push(Number(response.results[val]["week"]) || 0);
        chartData2.y.push(Number(response.results[val]["feed_average"]) || 0);
      }
      setData([...data, chartData, chartData2]);
    }
  };

  const handleOnIndividualFilterRemove = (index: number) => {
    let newData = data.filter((e, i) => i != index * 2);
    newData = newData.filter((e, i) => i != index * 2);
    setData(newData);
  };

  return (
    <Box>
      <DirectoryFilter
        onBatchFilterApply={handleOnBatchFilterApplay}
        onBatchFilterRemove={handleonBatchFilterRemove}
        onIndividualFilterApply={handleOnIndividualFilterApply}
        onIndividualFilterRemove={handleOnIndividualFilterRemove}
      />
      <Box mt={10}>
        <Plot
          layout={{
            title: "Feed consumption by Body weight",
            height: 500,
            xaxis: {
              title: "Age of birds (weeks)",
            },
            yaxis: {
              title: "Body weight (grams)",
            },
            yaxis2: {
              title: "Feed intake (grams)",
              overlaying: "y",
              side: "right",
            },
          }}
          config={{ responsive: true }}
          style={{ width: "100%" }}
          data={data}
        />
      </Box>
    </Box>
  );
};
