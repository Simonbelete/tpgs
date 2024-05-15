import React, { useEffect, useState } from "react";
import { Tabs, Tab, ToggleButtonGroup, ToggleButton } from "@mui/material";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import TableViewIcon from "@mui/icons-material/TableView";
import _ from "lodash";
import buildDirectoryQuery from "@/util/buildDirectoryQuery";
import directoryToLabel from "@/util/directoryToLabel";
import { Directory } from "@/models";
import { Dna } from "react-loader-spinner";
import { BarChartSkeleton } from "@/components";
import dynamic from "next/dynamic";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import { EditableTable } from "@/components/tables";
import { useLazyGetChickensRecordsetQualityQuery } from "@/features/one-click-report/services";

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
    field: "q1",
    headerName: "Q1 (25%)",
  },
  {
    field: "median",
    headerName: "Q1 (50%)",
  },
  {
    field: "q3",
    headerName: "Q3 (75%)",
  },
  {
    field: "mean",
    headerName: "Mean",
  },
  {
    field: "lowerfence",
    headerName: "Lower fence (Min)",
  },
  {
    field: "upperfence",
    headerName: "Upper fence (Max)",
  },
];

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <BarChartSkeleton />,
});

const MinandMax = ({
  filters,
  start_week,
  end_week,
  field_name,
}: {
  field_name: string;
  filters: any[];
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
      let q1: number[] = [];
      let median: number[] = [];
      let q3: number[] = [];
      let mean: number[] = [];
      let lowerfence: number[] = [];
      let upperfence: number[] = [];

      _.forEach(res, (row, j) => {
        const summary = _.get(row, field_name, null);

        q1.push(Number(_.get(summary, "25%", 0)));
        median.push(Number(_.get(summary, "50%", 0)));
        q3.push(Number(_.get(summary, "75%", 0)));
        mean.push(Number(_.get(summary, "mean%", 0)));
        lowerfence.push(Number(_.get(summary, "min", 0)));
        upperfence.push(Number(_.get(summary, "max", 0)));

        resultsTable.push({
          directory: directoryToLabel(filters[i] as Directory),
          week: Number(_.get(row, "week", 0)),
          q1: _.get(summary, "25%", 0),
          median: _.get(summary, "50%", 0),
          q3: _.get(summary, "75%", 0),
          mean: _.get(summary, "mean%", 0),
          lowerfence: _.get(summary, "min", 0),
          upperfence: _.get(summary, "max", 0),
        });
      });

      results.push({
        q1,
        median,
        q3,
        mean,
        lowerfence,
        upperfence,
        type: "box",
        boxpoints: "all",
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
            title: "Min and Max",
            height: 500,
            boxmode: "group",
            xaxis: {
              title: "Age of birds (weeks)",
            },
            yaxis: {
              title: "Value (grams)",
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
              "q1",
              "median",
              "q3",
              "mean",
              "lowerfence",
              "upperfence",
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

export default MinandMax;
