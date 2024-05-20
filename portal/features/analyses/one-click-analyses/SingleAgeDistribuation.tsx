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
    field: "age_in_days",
    headerName: "Age (days)",
  },
  {
    field: "total_count",
    headerName: "Total chickens",
  },
  {
    field: "age_in_weeks",
    headerName: "Age (weeks)",
  },
  {
    field: "sex_male",
    headerName: "Male (#)",
  },
  {
    field: "sex_female",
    headerName: "Female (#)",
  },
  {
    field: "sex_unknown",
    headerName: "Unknown (#)",
  },
];

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <BarChartSkeleton />,
});

const SingleAgeDistribution = ({
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

    let traceMale: number[] = [];
    let traceFemale: number[] = [];
    let traceUnknown: number[] = [];

    _.forEach(response.data?.results, (e, i) => {
      const row = e;

      const total_count: number = Number(_.get(row, "total_count", 0));
      const age_in_days: number = Number(_.get(row, "age_in_days", 0));
      const age_in_weeks: number = Number(_.get(row, "age_in_weeks", 0));
      const sex_male: number = Number(_.get(row, "sex.M", 0));
      const sex_female: number = Number(_.get(row, "sex.F", 0));
      const sex_unknown: number = Number(_.get(row, "sex.Unknown", 0));

      traceMale.push(sex_male);
      traceFemale.push(sex_female);
      traceUnknown.push(sex_unknown);

      resultsTable.push({
        total_count: total_count,
        age_in_days: age_in_days,
        age_in_weeks: age_in_weeks,
        sex_male: sex_male,
        sex_female: sex_female,
        sex_unknown: sex_unknown,
      });
    });

    setData([
      {
        x: x,
        y: traceMale,
        name: "Male",
        type: "bar",
      },
      {
        x: x,
        y: traceFemale,
        name: "Female",
        type: "bar",
      },
      {
        x: x,
        y: traceUnknown,
        name: "Unknown",
        type: "bar",
      },
    ]);
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
            title: "Age distribution",
            height: 500,
            barmode: "stack",
            xaxis: {
              title: "Age in week",
              dtick: 1,
            },
            yaxis: {
              title: "No of chickens",
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
              "age_in_days",
              "total_count",
              "age_in_weeks",
              "sex_male",
              "sex_female",
              "sex_unknown",
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

export default SingleAgeDistribution;
