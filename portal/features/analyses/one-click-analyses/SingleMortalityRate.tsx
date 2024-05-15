import React, { useEffect, useState } from "react";
import { Tabs, Tab, ToggleButtonGroup, ToggleButton } from "@mui/material";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import TableViewIcon from "@mui/icons-material/TableView";
import _, { filter, result } from "lodash";
import { useLazyGetMortalityRateQuery } from "@/features/one-click-report/services";
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
  {
    field: "livability_rate",
    headerName: "Livability (%)",
  },
  {
    field: "livability_total",
    headerName: "Livability (#)",
  },
  {
    field: "mortality_rate",
    headerName: "Mortality (%)",
  },
  {
    field: "mortality_total",
    headerName: "Mortality (#)",
  },
];

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <BarChartSkeleton />,
});

const SingleMortalityRate = ({
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

  const [trigger, { isFetching }] = useLazyGetMortalityRateQuery();

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

    const x: any = response.data?.results.map((e: any) => e.week);

    let y1a: number[] = [];
    let y1b: number[] = [];

    let y2a: number[] = [];
    let y2b: number[] = [];

    _.forEach(response.data?.results, (e, i) => {
      const row = e;

      y1a.push(Number(_.get(row, "mortality.total", 0)));
      y1b.push(Number(_.get(row, "mortality.rate", 0)));

      y2a.push(Number(_.get(row, "livability.total", 0)));
      y2b.push(Number(_.get(row, "livability.rate", 0)));
      console.log(row);
      resultsTable.push({
        id: _.get(row, "id", 0),
        week: Number(_.get(row, "week", 0)),
        mortality_total: Number(_.get(row, "mortality.total", 0)),
        mortality_rate: Number(_.get(row, "mortality.rate", 0)),
        livability_total: Number(_.get(row, "livability.total", 0)),
        livability_rate: Number(_.get(row, "livability.rate", 0)),
      });
    });

    results.push({
      x: x,
      y: y1b,
      text: y1b,
      yaxis: "y1",
      type: "scatter",
      name: "Mortality rate",
      marker: { color: "rgb(255, 127, 14)" },
    });

    results.push({
      x: x,
      y: y1a,
      yaxis: "y1",
      text: y1a,
      type: "bar",
      name: "Mortality number",
      marker: { color: "rgb(26, 118, 255)" },
    });

    results.push({
      x: x,
      y: y2a,
      yaxis: "y1",
      text: y2a,
      type: "bar",
      name: "Livability number",
      marker: { color: "rgb(55, 83, 109)" },
    });

    results.push({
      x: x,
      y: y2b,
      yaxis: "y2",
      text: y2b,
      type: "scatter",
      name: "Livability rate",
      marker: { color: "rgb(44, 160, 44)" },
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
            title: "Mortality",
            height: 500,
            barmode: "stack",
            xaxis: {
              title: "Age in week",
              dtick: 1,
            },
            yaxis: {
              title: "Mortality",
            },
            yaxis2: {
              title: "Livability",
              overlaying: "y",
              side: "right",
            },
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
            columns: [
              "week",
              "mortality_total",
              "mortality_rate",
              "livability_total",
              "livability_rate",
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

export default SingleMortalityRate;
