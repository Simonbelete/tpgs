import React, { useState } from "react";
import { DirectoryFilter, IndividualFilterProps } from "@/features/directory";
import { useLazyGetEggGradingAnalyseQuery } from "../services";
import dynamic from "next/dynamic";
import { BarChartSkeleton } from "@/components";
import { Box } from "@mui/material";
import directoryToLabel from "@/util/directoryToLabel";
import { Directory, DirectoryFilterData } from "@/models";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <BarChartSkeleton />,
});

interface GraphProps {
  x: number[];
  y: number[];
  mode?: string;
  name?: string;
  type?: string;
}

export const EggGradingAnalyses = () => {
  const [data, setData] = useState<any[]>([]);

  const [trigger] = useLazyGetEggGradingAnalyseQuery();

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

    // sm
    const chartData: GraphProps = {
      x: [],
      y: [],
      mode: "lines+markers",
      name: directoryToLabel(directory),
    };

    // m
    const chartData2: GraphProps = {
      x: [],
      y: [],
      mode: "lines+markers",
      name: directoryToLabel(directory),
    };

    // lg
    const chartData3: GraphProps = {
      x: [],
      y: [],
      mode: "lines+markers",
      name: directoryToLabel(directory),
    };

    // xl
    const chartData4: GraphProps = {
      x: [],
      y: [],
      mode: "lines+markers",
      name: directoryToLabel(directory),
    };

    if (response.results) {
      for (let val in response.results) {
        chartData.x.push(Number(response.results[val]["week"]) || 0);
        chartData.y.push(Number(response.results[val]["sm_grading"]) || 0);

        chartData2.x.push(Number(response.results[val]["week"]) || 0);
        chartData2.y.push(Number(response.results[val]["m_grading"]) || 0);

        chartData3.x.push(Number(response.results[val]["week"]) || 0);
        chartData3.y.push(Number(response.results[val]["lg_grading"]) || 0);

        chartData4.x.push(Number(response.results[val]["week"]) || 0);
        chartData4.y.push(Number(response.results[val]["xl_grading"]) || 0);
      }
      setData([...data, chartData, chartData2, chartData3, chartData4]);
    }
  };

  const handleonBatchFilterRemove = (index: number) => {
    let newData = data.filter((e, i) => i != index * 4);
    newData = newData.filter((e, i) => i != index * 4);
    newData = newData.filter((e, i) => i != index * 4);
    newData = newData.filter((e, i) => i != index * 4);
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

    // sm
    const chartData: GraphProps = {
      x: [],
      y: [],
      mode: "lines+markers",
      name: indvData.chicken.display_name,
    };

    // m
    const chartData2: GraphProps = {
      x: [],
      y: [],
      mode: "lines+markers",
      name: indvData.chicken.display_name,
    };

    // lg
    const chartData3: GraphProps = {
      x: [],
      y: [],
      mode: "lines+markers",
      name: indvData.chicken.display_name,
    };

    // xl
    const chartData4: GraphProps = {
      x: [],
      y: [],
      mode: "lines+markers",
      name: indvData.chicken.display_name,
    };

    if (response.results) {
      for (let val in response.results) {
        chartData.x.push(Number(response.results[val]["week"]) || 0);
        chartData.y.push(Number(response.results[val]["sm_grading"]) || 0);

        chartData2.x.push(Number(response.results[val]["week"]) || 0);
        chartData2.y.push(Number(response.results[val]["m_grading"]) || 0);

        chartData3.x.push(Number(response.results[val]["week"]) || 0);
        chartData3.y.push(Number(response.results[val]["lg_grading"]) || 0);

        chartData4.x.push(Number(response.results[val]["week"]) || 0);
        chartData4.y.push(Number(response.results[val]["xl_grading"]) || 0);
      }

      setData([...data, chartData]);
    }
  };

  const handleOnIndividualFilterRemove = (index: number) => {
    const newData = data.filter((e, i) => i != index);
    setData(newData);
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
            title: "Hen-Day Egg Production",
            height: 500,
            barmode: "stack",
            xaxis: {
              title: "Age of birds (weeks)",
            },
            yaxis: {
              title: "Average egg mass (Per hen per day in grams)",
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
