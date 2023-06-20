import React, { useEffect, useState } from "react";
import { GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { Box, IconButton } from "@mui/material";
import { DataTable } from "@/components/tables";
import { IngredientType } from "@/models";
import { useSnackbar } from "notistack";
import ingredient_type_services from "../services/ingredient_type_services";

const columns: GridColDef[] = [
  { field: "name", headerName: "name", flex: 1, minWidth: 150 },
];

const IngredientTypeList = () => {
  const [rows, setRows] = useState<GridRowsProp<IngredientType>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    setIsLoading(true);
    try {
      ingredient_type_services.get().then((response) => {
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

  const handleDelete = async (id: number) => {
    try {
      const response = await ingredient_type_services.delete(id);
      if (response.status == 204)
        enqueueSnackbar("Successfully Deleted!", { variant: "success" });
      else enqueueSnackbar("Failed to Deleted!", { variant: "error" });
    } catch (ex) {
      enqueueSnackbar("Server Error!", { variant: "error" });
    } finally {
      refresh();
    }
  };

  return (
    <DataTable
      onDelete={handleDelete}
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

export default IngredientTypeList;
