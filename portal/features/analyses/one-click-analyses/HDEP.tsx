import React, { useEffect, useState } from "react";
import { Tabs, Tab, ToggleButtonGroup, ToggleButton } from "@mui/material";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import TableViewIcon from "@mui/icons-material/TableView";
import _, { filter, result } from "lodash";
import { useLazyGetHdepQuery } from "../services";
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
    field: "directory",
    headerName: "Filter",
  },
  {
    field: "week",
    headerName: "Week",
  },
  {
    field: "no_of_eggs",
    headerName: "No of eggs",
  },
  {
    field: "no_of_hen_days",
    headerName: "No of Hen days",
  },
  {
    field: "hdep",
    headerName: "HDEP (%)",
  },
];

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <BarChartSkeleton />,
});

const HDEP = ({
  filters,
  start_week,
  end_week,
}: {
  filters: any[];
  start_week?: number;
  end_week?: number;
}) => {
  const [value, setValue] = useState("graph");
  const [data, setData] = useState<any[]>([]);
  const [tableData, setTableData] = useState<any[]>([]);

  const [trigger, { isFetching }] = useLazyGetHdepQuery();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    if (filters.length == 0) {
      return;
    }

    const requests = _.map(filters, (e) => {
      const query = {
        ...buildDirectoryQuery(e),
        start_week: start_week,
        end_week: end_week,
      };
      return trigger(query);
    });
    const responses = await Promise.all(requests);

    const results: any = [];
    const resultsTable: any = [];

    _.forEach(responses, (e, i) => {
      const res = e?.data?.results;
      let x: number[] = [];
      let y: number[] = [];

      _.forEach(res, (row, j) => {
        x.push(Number(_.get(row, "week", 0)));
        y.push(Number(_.get(row, "hdep", 0)));

        resultsTable.push({
          id: "",
          directory: directoryToLabel(filters[i] as Directory),
          week: Number(_.get(row, "week", 0)),
          no_of_eggs: Number(_.get(row, "no_of_eggs", 0)),
          no_of_hen_days: Number(_.get(row, "no_of_hen_days", 0)),
          hhep: Number(_.get(row, "hdep", 0)),
        });
      });

      results.push({
        x: x,
        y: y,
        mode: "lines+markers",
        name: directoryToLabel(filters[i] as Directory),
      });
    });

    setData(results);
    setTableData(resultsTable);
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
      )}
      {!isFetching && value == "table" && (
        <EditableTable
          getRowId={(row: any) => row.directory + row.week}
          columns={columns}
          rows={tableData ?? []}
          loading={isFetching}
          slots={{ toolbar: GridToolbar }}
          pageSizeOptions={[10, 25, 50, 100, 1000]}
          density="compact"
          checkboxSelection
          autosizeOptions={{
            columns: [
              "directory",
              "week",
              "no_of_eggs",
              "no_of_hen_days",
              "hdep",
            ],
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

export default HDEP;
