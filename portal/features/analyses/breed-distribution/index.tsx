import React, { useEffect, useState } from "react";
import { DirectoryFilter, IndividualFilterProps } from "@/features/directory";
import { useLazyGetBreedDistributionQuery } from "../services";
import dynamic from "next/dynamic";
import { PieChartSkeleton, StatisticsCard } from "@/components";
import { Box } from "@mui/material";
import directoryToLabel from "@/util/directoryToLabel";
import { Directory, DirectoryFilterData } from "@/models";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <PieChartSkeleton />,
});

export const BreedDistribution = ({ compact }: { compact?: boolean }) => {
  const selector = useSelector((state: RootState) => state.tenant);
  const [data, setData] = useState<any[]>([]);

  const [trigger] = useLazyGetBreedDistributionQuery();

  const buildGraph = async (directory: Directory) => {
    const query = {
      farm: directory.farm ? (directory.farm as any).id || null : null,
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

    const labels = [];
    const values = [];

    for (let val in response.results) {
      labels.push(response.results[val]["name"]);
      values.push(response.results[val]["percentage"]);
    }

    if (response.results) {
      return {
        values: values,
        labels: labels,
        type: "pie",
        hoverinfo: "label+percent+name",
        textinfo: "none",
        name: directoryToLabel(directory),
      };
    }
  };

  const handleOnBatchFilterApplay = async (directory: Directory) => {
    const result = await buildGraph(directory);
    setData([...data, result]);
  };

  useEffect(() => {
    // Load Current Farm init data
    // @ts-ignore
    buildGraph({ farm: selector }).then((result) => {
      console.log(result);
      setData([
        {
          values: [10, 20, 30],
          labels: ["x", "y", "z"],
          type: "pie",
          hoverinfo: "label+percent+name",
          textinfo: "none",
          name: "d",
        },
      ]);
    });
  }, []);

  const handleonBatchFilterRemove = (index: number) => {
    const newData = data.filter((e, i) => i != index);
    setData(newData);
  };

  const handleOnIndividualFilterApply = async (
    indvData: IndividualFilterProps
  ) => {};

  const handleOnIndividualFilterRemove = (index: number) => {};

  return (
    <>
      {compact ? (
        <StatisticsCard>
          <Box sx={{ px: 2 }}>
            <DirectoryFilter
              title={"Breeds"}
              compact={compact}
              onBatchFilterApply={handleOnBatchFilterApplay}
              onBatchFilterRemove={handleonBatchFilterRemove}
              default_start_week={21}
              default_end_week={41}
              onIndividualFilterApply={handleOnIndividualFilterApply}
              onIndividualFilterRemove={handleOnIndividualFilterRemove}
              initBatchFilter={[{ farm: selector as any }]}
            />
          </Box>
          <Box mt={1}>
            <Plot
              layout={{
                title: "Breeds",
                height: 500,
                grid: {
                  rows:
                    data.length == 1 ? 0 : Math.abs(Math.ceil(data.length / 2)),
                  columns: 2,
                },
              }}
              config={{ responsive: true }}
              style={{ width: "100%" }}
              data={data}
            />
          </Box>
        </StatisticsCard>
      ) : (
        <Box>
          <Box>
            <DirectoryFilter
              title={"Breeds"}
              compact={compact}
              onBatchFilterApply={handleOnBatchFilterApplay}
              onBatchFilterRemove={handleonBatchFilterRemove}
              default_start_week={21}
              default_end_week={41}
              onIndividualFilterApply={handleOnIndividualFilterApply}
              onIndividualFilterRemove={handleOnIndividualFilterRemove}
              initBatchFilter={[{ farm: selector as any }]}
            />
          </Box>
          <Box mt={10}>
            <Plot
              layout={{
                title: "Breeds",
                height: 500,
                grid: {
                  rows:
                    data.length == 1 ? 0 : Math.abs(Math.ceil(data.length / 2)),
                  columns: 2,
                },
              }}
              config={{ responsive: true }}
              style={{ width: "100%" }}
              data={data}
            />
          </Box>
        </Box>
      )}
    </>
  );
};
