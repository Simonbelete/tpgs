import React, { useEffect, useState } from "react";
import { GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { DataTable } from "@/components/tables";
import { ReductionReason } from "@/models";
import _ from "lodash";
import { useGetReductionReasonHistoryQuery } from "../services";
import { historyColDef } from "@/components/gird-col-def";

const columns: GridColDef[] = [
  ...historyColDef,
  { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
];

const ReductionReasonHistoryList = ({ id }: { id: number }) => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const { data, isLoading, refetch } = useGetReductionReasonHistoryQuery({
    id: id,
    query: paginationModel,
  });

  return (
    <DataTable
      onDelete={() => {}}
      rows={(data?.results ?? []) as GridRowsProp<ReductionReason>}
      columns={columns}
      rowCount={data?.count || 0}
      loading={isLoading}
      pageSizeOptions={[5, 10, 25, 50, 100]}
      paginationModel={paginationModel}
      paginationMode="server"
      onPaginationModelChange={setPaginationModel}
      setting={DataTable.SETTING_COL.history}
    />
  );
};

export default ReductionReasonHistoryList;
