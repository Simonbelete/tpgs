import React, { useEffect, useState } from "react";
import { DirectoryFilter, IndividualFilterProps } from "@/features/directory";
import { useLazyGetMortalityQuery } from "../services";
import dynamic from "next/dynamic";
import { BarChartSkeleton } from "@/components";
import { Box } from "@mui/material";
import directoryToLabel from "@/util/directoryToLabel";
import { Directory, DirectoryFilterData } from "@/models";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import { EditableTable } from "@/components/tables";
import buildDirectoryQuery from "@/util/buildDirectoryQuery";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <BarChartSkeleton />,
});

export const MortalityAnalyses = ({ livability }: { livability?: boolean }) => {
  const [data, setData] = useState<any[]>([]);

  const [trigger, { isFetching, data: fetchData }] = useLazyGetMortalityQuery();

  const handleOnBatchFilterApplay = async (directory: Directory) => {
    const query = buildDirectoryQuery(directory);
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

  const columns: GridColDef[] = [
    {
      field: "farm",
      headerName: "Farm",
      width: 150,
    },
    {
      field: "breed",
      headerName: "Breed",
      width: 150,
    },
    {
      field: "generation",
      headerName: "Generation",
      width: 150,
    },
    {
      field: "hatchery",
      headerName: "Hatchery",
      width: 150,
    },
    {
      field: "house",
      headerName: "House",
      width: 150,
    },
    {
      field: "pen",
      headerName: "Pen",
      width: 150,
    },
    {
      field: "sex",
      headerName: "Sex",
      width: 150,
    },
  ];

  return (
    <>
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
      {/* <Box sx={{ mt: 5, background: "#fff" }}>
        <EditableTable
          columns={columns}
          rows={fetchData?.results ?? []}
          loading={isFetching}
          slots={{ toolbar: GridToolbar }}
          pageSizeOptions={[10, 25, 50, 100, 1000]}
        />
      </Box> */}
    </>
  );
};
