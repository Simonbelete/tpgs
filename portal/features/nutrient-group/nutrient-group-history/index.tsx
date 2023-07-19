import React, { useEffect, useState } from "react";
import { GridRowsProp, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { DataTable } from "@/components/tables";
import nutrient_group_service from "../services/nutrient_group_service";
import { NutrientGroupHistory } from "@/models";
import { historyColDef } from "@/components/gird-col-def";

const columns: GridColDef[] = [
  ...historyColDef,
  { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
];

const NutrientGroupHistoryList = ({ id }: { id: number }) => {
  const [rows, setRows] = useState<GridRowsProp<NutrientGroupHistory>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  useEffect(() => {
    setIsLoading(true);
    try {
      nutrient_group_service.history.get(id).then((response) => {
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
    />
  );
};

export default NutrientGroupHistoryList;
