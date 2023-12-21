import React, { useState } from "react";
import { DirectoryFilter, IndividualFilterProps } from "@/features/directory";
import { useLazyGetMortalityQuery } from "../services";
import dynamic from "next/dynamic";
import { BarChartSkeleton } from "@/components";
import { Box } from "@mui/material";
import directoryToLabel from "@/util/directoryToLabel";
import { Directory, DirectoryFilterData } from "@/models";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <BarChartSkeleton />,
});

export const MortalityAnalyses = ({ livability }: { livability?: boolean }) => {
  const [data, setData] = useState<any[]>([]);

  const [trigger] = useLazyGetMortalityQuery();

  const handleOnBatchFilterApplay = async (directory: Directory) => {
    const query = {
      farm: (directory.farm as any).id || null,
      hatchery: directory.hatchery
        ? (directory.hatchery as any).id || null
        : null,
      generation: directory.generation || null,
      breed: directory.breed ? (directory.breed as any).id || null : null,
      house: directory.house ? (directory.house as any).id || null : null,
      pen: directory.pen ? (directory.pen as any).id || null : null,
      start_week: directory.start_week,
      end_week: directory.end_week,
      sex: directory.sex ? directory.sex.value : null,
    };
    const response = await trigger(query, false).unwrap();
    const chartData: any = {
      x: [],
      y: [],
      mode: "lines+markers",
      line: { shape: "linear" },
      type: "scatter",
      name: directoryToLabel(directory),
    };

    if (response.results) {
      for (let val in response.results) {
        chartData.x.push(Number(response.results[val]["week"]) || 0);
        if (livability)
          chartData.y.push(Number(response.results[val]["livability"]) || 0);
        else chartData.y.push(Number(response.results[val]["mortality"]) || 0);
      }
      setData([...data, chartData]);
    }
  };

  const handleonBatchFilterRemove = (index: number) => {
    const newData = data.filter((e, i) => i != index);
    setData(newData);
  };

  const handleOnIndividualFilterApply = async (
    indvData: IndividualFilterProps
  ) => {};

  const handleOnIndividualFilterRemove = (index: number) => {};

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
            title: livability ? "Livability" : "Mortality",
            height: 500,
            xaxis: {
              title: "Age of birds (weeks)",
            },
            yaxis: {
              title: livability ? "Livability (%)" : "Mortality (%)",
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
