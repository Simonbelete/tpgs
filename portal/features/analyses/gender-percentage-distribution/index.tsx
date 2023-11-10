import React, { useEffect, useState } from "react";
import { DirectoryFilter, IndividualFilterProps } from "@/features/directory";
import { useLazyGetGenderDistributionQuery } from "../services";
import dynamic from "next/dynamic";
import { BarChartSkeleton, StatisticsCard } from "@/components";
import { Box } from "@mui/material";
import directoryToLabel from "@/util/directoryToLabel";
import { Directory, DirectoryFilterData } from "@/models";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <BarChartSkeleton />,
});

export const GenderPercentageDistribution = ({
  compact,
}: {
  compact?: boolean;
}) => {
  const [data, setData] = useState<any[]>([]);

  const [trigger] = useLazyGetGenderDistributionQuery();

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

    if (response.results) {
      const total_count = response.results["total_count"];
      const male_percentage =
        (response.results["total_male_count"] / total_count) * 100 || 0;
      const female_percentage =
        (response.results["total_female_count"] / total_count) * 100 || 0;
      const other_percentage =
        (response.results["total_other_count"] / total_count) * 100 || 0;

      setData([
        ...data,
        {
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
        },
      ]);
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
  ) => {};

  const handleOnIndividualFilterRemove = (index: number) => {};

  return (
    <StatisticsCard>
      <Box sx={{ px: 2 }}>
        <DirectoryFilter
          compact={compact}
          onBatchFilterApply={handleOnBatchFilterApplay}
          onBatchFilterRemove={handleonBatchFilterRemove}
          default_start_week={21}
          default_end_week={41}
          onIndividualFilterApply={handleOnIndividualFilterApply}
          onIndividualFilterRemove={handleOnIndividualFilterRemove}
        />
      </Box>
      <Box mt={1}>
        <Plot
          layout={{
            title: "Gender Percentage Distribution",
            height: 500,
            grid: {
              rows: data.length == 1 ? 0 : Math.abs(Math.ceil(data.length / 2)),
              columns: 2,
            },
          }}
          config={{ responsive: true }}
          style={{ width: "100%" }}
          data={data}
        />
      </Box>
    </StatisticsCard>
  );
};
