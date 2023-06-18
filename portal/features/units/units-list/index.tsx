import React, { useEffect, useState } from "react";
import { GridRowsProp, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { DataTable } from "@/components/tables";
import { Unit } from "@/models";
import unit_service from "../services/unit_service";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1, minWidth: 150 },
  { field: "name", headerName: "name", flex: 1, minWidth: 150 },
];

const UnitsList = () => {
  const [rows, setRows] = useState<GridRowsProp<Unit>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  useEffect(() => {
    setIsLoading(true);
    try {
      unit_service.get().then((response) => {
        setRows(response.data.results);
      });
    } catch (ex) {
    } finally {
      setIsLoading(false);
    }
  }, [paginationModel]);

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
    />
  );
};

export default UnitsList;
