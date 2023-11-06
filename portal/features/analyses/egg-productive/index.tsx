import React, { useState } from "react";
import { DirectoryFilter, DirectoryFilterData } from "@/features/directory";
import { useLazyGetEggProductionQuery } from "../services";
import dynamic from "next/dynamic";
import { BarChartSkeleton } from "@/components";
import { Box } from "@mui/material";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <BarChartSkeleton />,
});

export const EggProductive = () => {
  const [data, setData] = useState<any[]>([]);

  const [trigger] = useLazyGetEggProductionQuery();

  const buildDirectoryQuery = () => {
    return {};
  };

  const handleSubmit = async (filters: DirectoryFilterData) => {
    setData([]);
    for (let i = 0; i <= filters.directories.length; i += 1) {
      const query = {
        start_week: filters.start_week,
        end_week: filters.end_week,
        ...filters.directories[i],
      };
      const response = await trigger(query, false).unwrap();
      const chartData: { x: number[]; y: number[] } = { x: [], y: [] };
      if (response.results) {
        for (let val in response.results) {
          chartData.x.push(Number(response.results[val]["week"]) || 0);
          chartData.x.push(Number(response.results[val]["week"]) || 0);
        }
      }

      console.log(chartData);
      setData([chartData]);
    }

    console.log("0000000000000000000000");
    console.log(data);
  };

  return (
    <Box>
      <DirectoryFilter onSubmit={handleSubmit} />
      <Box>
        <Plot
          layout={{
            title:
              " Percentage of productive laying chickens over a period of time",
            height: 500,
            xaxis: {
              title: "Age of birds (weeks)",
            },
            yaxis: {
              title: "Hen's prodcution (%)",
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
