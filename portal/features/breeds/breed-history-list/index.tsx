import React, { useEffect, useState } from "react";
import { GridRowsProp, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { DataTable } from "@/components/tables";
import breed_service from "../services/breed_service";
import { BreedHistory } from "@/models";
import { historyColDef } from "@/components/gird-col-def";

const columns: GridColDef[] = [
  ...historyColDef,
  { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
];

const BreedHistoryList = ({ id }: { id: number }) => {
  const [rows, setRows] = useState<GridRowsProp<BreedHistory>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  useEffect(() => {
    setIsLoading(true);
    try {
      breed_service.history.get(id).then((response) => {
        setRows(response.data.results);
      });
    } catch (ex) {
    } finally {
      setIsLoading(false);
    }
  }, [paginationModel]);

  const refresh = () => {
    setPaginationModel({ page: 0, pageSize: 10 });
  };

  return (
    <DataTable
      rows={rows}
      columns={columns}
      rowCount={rows.length}
      loading={isLoading}
      pageSizeOptions={[5]}
      paginationModel={paginationModel}
      paginationMode="server"
      onPaginationModelChange={setPaginationModel}
      setting={DataTable.SETTING_COL.history}
    />
  );
};

export default BreedHistoryList;
