import React, { useEffect, useState } from "react";
import { Tabs, Tab, ToggleButtonGroup, ToggleButton } from "@mui/material";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import TableViewIcon from "@mui/icons-material/TableView";
import _, { filter, result } from "lodash";
import {
  useLazyGetChickensRecordsetQualityQuery,
  useLazyGetMortalityRateQuery,
} from "@/features/one-click-report/services";
import buildDirectoryQuery from "@/util/buildDirectoryQuery";
import directoryToLabel from "@/util/directoryToLabel";
import { Directory } from "@/models";
import { Dna } from "react-loader-spinner";
import { BarChartSkeleton } from "@/components";
import dynamic from "next/dynamic";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import { EditableTable } from "@/components/tables";

const columns: GridColDef[] = [
  {
    field: "week",
    headerName: "Week",
  },
];

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <BarChartSkeleton />,
});

const WeeklyDataCollectionGraph = ({
  filter,
  start_week,
  end_week,
}: {
  filter: any;
  start_week?: number;
  end_week?: number;
}) => {
  const [value, setValue] = useState("graph");
  const [data, setData] = useState<any[]>([]);
  const [tableData, setTableData] = useState<any[]>([]);

  const [trigger, { isFetching }] = useLazyGetChickensRecordsetQualityQuery();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    if (filter == null) {
      return;
    }

    const query = {
      ...buildDirectoryQuery(filter),
      start_week: start_week,
      end_week: end_week,
    };

    const response = await trigger(query);

    const results: any = [];
    const resultsTable: any = [];

    const x: any = [[], []];

    response.data?.results.forEach((e: any) => {
      x[0].push(e.week);
      x[0].push(e.week);
      x[0].push(e.week);

      x[1].push("Weight");
      x[1].push("Feed");
      x[1].push("Eggs");
    });

    const trace1: any = {
      x: x,
      y: [],
      text: [],
      name: "Collected",
      type: "bar",
      marker: { color: "rgb(10, 81, 126)" },
    };

    const trace2: any = {
      x: x,
      y: [],
      text: [],
      name: "Not Collected",
      type: "bar",
      marker: { color: "rgb(226, 92, 89)" },
    };

    if (response.data == null) return;

    for (let i = 0; i < response?.data?.results?.length; i++) {
      trace1.y.push(response.data?.results[i]?.body_weight?.recorded);
      trace1.y.push(response.data?.results[i]?.feed_intake?.recorded);
      trace1.y.push(response.data?.results[i]?.eggs?.recorded);

      trace1.text.push(response.data?.results[i]?.body_weight?.recorded);
      trace1.text.push(response.data?.results[i]?.feed_intake?.recorded);
      trace1.text.push(response.data?.results[i]?.eggs?.recorded);

      trace2.y.push(response.data?.results[i]?.body_weight?.missing);
      trace2.y.push(response.data?.results[i]?.feed_intake?.missing);
      trace2.y.push(response.data?.results[i]?.eggs?.missing);

      trace2.text.push(response.data?.results[i]?.body_weight?.missing);
      trace2.text.push(response.data?.results[i]?.feed_intake?.missing);
      trace2.text.push(response.data?.results[i]?.eggs?.missing);
    }

    setData([trace1, trace2]);
    // setTableData(resultsTable);
  };

  return (
    <div>
      <ToggleButtonGroup
        size="small"
        value={value}
        exclusive={true}
        onChange={handleChange}
      >
        <ToggleButton value={"graph"} key="graph">
          <AutoGraphIcon fontSize="small" />
        </ToggleButton>
        <ToggleButton value={"table"} key="table">
          <TableViewIcon fontSize="small" />
        </ToggleButton>
      </ToggleButtonGroup>
      {isFetching && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Dna
            visible={true}
            height="200"
            width="200"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </div>
      )}
      {!isFetching && value == "graph" && (
        <Plot
          layout={{
            title: "Weekly data collection report",
            height: 500,
            xaxis: {
              ticklen: 1,
              dividerwidth: 1,
              type: "multicategory",
            },
            yaxis: {
              title: "",
            },
            barmode: "stack",
          }}
          config={{ responsive: true }}
          style={{ width: "100%" }}
          data={data}
        />
      )}
      {!isFetching && value == "table" && (
        <EditableTable
          columns={columns}
          rows={tableData ?? []}
          loading={isFetching}
          slots={{ toolbar: GridToolbar }}
          pageSizeOptions={[10, 25, 50, 100, 1000]}
          density="compact"
          checkboxSelection
          autosizeOptions={{
            columns: [],
            includeOutliers: true,
            includeHeaders: true,
            expand: true,
          }}
          autosizeOnMount={true}
        />
      )}
    </div>
  );
};

export default WeeklyDataCollectionGraph;
