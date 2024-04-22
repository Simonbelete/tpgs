import React, { useEffect, useState } from "react";
import {
  DirectoryFilter,
  IndividualFilterProps,
  GuidelineFilterProps,
} from "@/features/directory";
import { useLazyGetFeedAnalyseQuery } from "../services";
import dynamic from "next/dynamic";
import { BarChartSkeleton } from "@/components";
import { Box } from "@mui/material";
import directoryToLabel from "@/util/directoryToLabel";
import { Directory, DirectoryFilterData } from "@/models";
import { useLazyGetFeedGuidelinesQuery } from "@/features/feed-guidelines/services";
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
}

export const FeedGraphAnalyses = () => {
  const [data, setData] = useState<any[]>([]);

  const [trigger] = useLazyGetFeedAnalyseQuery();
  const [feedGuidelineTrigger] = useLazyGetFeedGuidelinesQuery();

  const handleOnBatchFilterApplay = async (directory: Directory) => {
    const query = buildDirectoryQuery(directory);
    const response = await trigger(query, false).unwrap();
    const chartData: GraphProps = {
      x: [],
      y: [],
      mode: "lines+markers",
      name: directoryToLabel(directory),
    };

    if (response.results) {
      for (let val in response.results) {
        chartData.x.push(Number(response.results[val]["week"]) || 0);
        chartData.y.push(Number(response.results[val]["weight"]) || 0);
      }
      setData([...data, chartData]);
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleonBatchFilterRemove = (index: number) => {
    const newData = data.filter((e, i) => i != index);
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
      name: indvData.chicken.display_name,
    };

    if (response.results) {
      for (let val in response.results) {
        chartData.x.push(Number(response.results[val]["week"]) || 0);
        chartData.y.push(Number(response.results[val]["weight"]) || 0);
      }

      setData([...data, chartData]);
    }
  };

  const handleOnIndividualFilterRemove = (index: number) => {
    const newData = data.filter((e, i) => i != index);
    setData(newData);
  };

  const handleOnGuidelineFilterApply = async (gdata: GuidelineFilterProps) => {
    const response = await feedGuidelineTrigger({
      id: gdata.breed.id,
      query: {
        limit: Math.abs(gdata.end_week - gdata.start_week) + 2,
        start_week: gdata.start_week || 0,
        end_week: gdata.end_week || 10,
      },
    });

    const chartData: GraphProps = {
      x: [],
      y: [],
      mode: "lines+markers",
      name: gdata.breed.display_name,
    };

    if (response.data?.results) {
      for (let val in response.data.results) {
        chartData.x.push(Number(response.data.results[val]["week"]) || 0);
        chartData.y.push(Number(response.data.results[val]["weight"]) || 0);
      }

      setData([...data, chartData]);
    }
  };

  const handleOnGuidelineFilterRemove = (index: number) => {
    const newData = data.filter((e, i) => i != index);
    setData(newData);
  };

  return (
    <Box>
      <DirectoryFilter
        onBatchFilterApply={handleOnBatchFilterApplay}
        onBatchFilterRemove={handleonBatchFilterRemove}
        default_start_week={0}
        default_end_week={20}
        onIndividualFilterApply={handleOnIndividualFilterApply}
        onIndividualFilterRemove={handleOnIndividualFilterRemove}
        onGuidelineFilterApply={handleOnGuidelineFilterApply}
        onGuidelineFilterRemove={handleOnGuidelineFilterRemove}
      />
      <Box mt={10}>
        <Plot
          layout={{
            title: "Feed intake graph",
            height: 500,
            xaxis: {
              title: "Age of birds (weeks)",
            },
            yaxis: {
              title: "Average feed intake (grams)",
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
