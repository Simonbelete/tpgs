import React, { useEffect, useState } from "react";
import { DirectoryFilter, IndividualFilterProps } from "@/features/directory";
import { useLazyGetGenderDistributionQuery } from "../services";
import dynamic from "next/dynamic";
import { PieChartSkeleton, StatisticsCard } from "@/components";
import { Box } from "@mui/material";
import directoryToLabel from "@/util/directoryToLabel";
import { Directory, DirectoryFilterData } from "@/models";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import buildDirectoryQuery from "@/util/buildDirectoryQuery";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <PieChartSkeleton />,
});

export const GenderPercentageDistribution = ({
  compact,
}: {
  compact?: boolean;
}) => {
  const selector = useSelector((state: RootState) => state.tenant);
  const [data, setData] = useState<any[]>([]);
  const [initData, setInitData] = useState<any>();

  const [trigger] = useLazyGetGenderDistributionQuery();

  const buildGraph = async (directory: Directory) => {
    const query = buildDirectoryQuery(directory);

    const response = await trigger(query, false).unwrap();

    if (response.results) {
      const total_count = response.results["total_count"];
      const male_percentage =
        (response.results["total_male_count"] / total_count) * 100 || 0;
      const female_percentage =
        (response.results["total_female_count"] / total_count) * 100 || 0;
      const other_percentage =
        (response.results["total_other_count"] / total_count) * 100 || 0;

      return {
        values: [male_percentage, female_percentage, other_percentage],
        labels: ["Male", "Femal", "Unknown"],
        type: "pie",
        name: directoryToLabel(directory),
        domain: {
          row: Math.floor(data.length / 2),
          column: data.length % 2 == 0 ? 0 : 1,
        },
        hoverinfo: "label+percent+name",
        textinfo: "none",
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
      setData([result]);
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
              title={"Sex Percentage Distribution"}
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
                title: "Sex Percentage Distribution",
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
              title={"Sex Percentage Distribution"}
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
                title: "Sex Percentage Distribution",
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

export default GenderPercentageDistribution;
