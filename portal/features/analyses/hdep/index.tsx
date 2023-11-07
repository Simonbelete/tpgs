import React, { useState } from "react";
import { DirectoryFilter, DirectoryFilterData } from "@/features/directory";
import { useLazyGetHdepQuery } from "../services";
import dynamic from "next/dynamic";
import { BarChartSkeleton } from "@/components";
import { Box } from "@mui/material";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <BarChartSkeleton />,
});

export const HDEPAnalyses = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [trigger] = useLazyGetHdepQuery();

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const handleSubmit = async (filters: DirectoryFilterData) => {
    setData([]);
    setIsLoading(true);
    for (let i = 0; i < filters.directories.length; i += 1) {
      const query = {
        start_week: filters.start_week,
        end_week: filters.end_week,
        ...filters.directories[i],
      };
      const response = await trigger(query, false).unwrap();
      const chartData: { x: number[]; y: number[] } = { x: [], y: [] };
      const chartData2: { x: number[]; y: number[] } = { x: [], y: [] };
      if (response.results) {
        for (let val in response.results) {
          chartData.x.push(Number(response.results[val]["week"]) || 0);
          chartData.y.push(Number(response.results[val]["hdep"]) || 0);
        }
      }
      setData([chartData]);
      await delay(3000);
    }
    setIsLoading(false);
  };

  return (
    <Box>
      <DirectoryFilter
        onSubmit={handleSubmit}
        computedData={data}
        isLoading={isLoading}
      />
      <Box mt={10}>
        <Plot
          layout={{
            title: "Hen-Day Egg Production",
            height: 500,
            xaxis: {
              title: "Age of birds (weeks)",
            },
            yaxis: {
              title: "Hen-Day Egg Production (%)",
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
