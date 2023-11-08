import React, { useState } from "react";
import {
  DirectoryFilter,
  DirectoryFilterData,
  IndividualFilterProps,
} from "@/features/directory";
import { useLazyGetEggProductionQuery } from "../services";
import dynamic from "next/dynamic";
import { BarChartSkeleton } from "@/components";
import { Box } from "@mui/material";
import { Directory } from "@/models";
import directoryToLabel from "@/util/directoryToLabel";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <BarChartSkeleton />,
});

export interface GraphProps {
  x: number[];
  y: number[];
  mode?: string;
  name?: string;
}

export const EggProductive = () => {
  const [data, setData] = useState<any[]>([]);
  const [data2, setData2] = useState<any[]>([]);

  const [trigger] = useLazyGetEggProductionQuery();

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

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
      sex: directory.sex.value,
    };
    const response = await trigger(query, false).unwrap();
    const chartData: GraphProps = {
      x: [],
      y: [],
      mode: "lines+markers",
      name: directoryToLabel(directory),
    };
    const chartData2: GraphProps = {
      x: [],
      y: [],
      mode: "lines+markers",
      name: directoryToLabel(directory),
    };

    if (response.results) {
      for (let val in response.results) {
        chartData.x.push(Number(response.results[val]["week"]) || 0);
        chartData.y.push(Number(response.results[val]["production"]) || 0);

        chartData2.x.push(Number(response.results[val]["week"]) || 0);
        chartData2.y.push(Number(response.results[val]["no_of_eggs"]) || 0);
      }

      setData([...data, chartData]);
      setData2([...data2, chartData2]);
    }
  };

  const handleonBatchFilterRemove = (index: number) => {
    const newData = data.filter((e, i) => i != index);
    const newData2 = data2.filter((e, i) => i != index);
    setData(newData);
    setData2(newData2);
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
    const chartData2: GraphProps = {
      x: [],
      y: [],
      mode: "lines+markers",
      name: indvData.chicken.display_name,
    };

    if (response.results) {
      for (let val in response.results) {
        chartData.x.push(Number(response.results[val]["week"]) || 0);
        chartData.y.push(Number(response.results[val]["production"]) || 0);

        chartData2.x.push(Number(response.results[val]["week"]) || 0);
        chartData2.y.push(Number(response.results[val]["no_of_eggs"]) || 0);
      }

      setData([...data, chartData]);
      setData2([...data2, chartData2]);
    }
  };

  const handleOnIndividualFilterRemove = (index: number) => {
    const newData = data.filter((e, i) => i != index);
    const newData2 = data2.filter((e, i) => i != index);
    setData(newData);
    setData2(newData2);
  };

  return (
    <Box>
      <DirectoryFilter
        onBatchFilterApply={handleOnBatchFilterApplay}
        onBatchFilterRemove={handleonBatchFilterRemove}
        default_start_week={21}
        default_end_week={41}
        onIndividualFilterApply={handleOnIndividualFilterApply}
        onIndividualFilterRemove={handleOnIndividualFilterRemove}
      />
      <Box mt={10}>
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
      <Box mt={10}>
        <Plot
          layout={{
            title: "Number of eggs produced over a period of time",
            height: 500,
            xaxis: {
              title: "Age of birds (weeks)",
            },
            yaxis: {
              title: "Number of eggs",
            },
          }}
          config={{ responsive: true }}
          style={{ width: "100%" }}
          data={data2}
        />
      </Box>
    </Box>
  );
};
