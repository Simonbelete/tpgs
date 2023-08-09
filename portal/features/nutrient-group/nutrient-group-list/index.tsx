import React, { useEffect, useState } from "react";
import { GridRowsProp, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { DataTable } from "@/components/tables";
import nutrient_group_service from "../services/nutrient_group_service";
import { NutrientGroup } from "@/models";
import { useSnackbar } from "notistack";

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
];

const NutrientGroupList = () => {
  const [rows, setRows] = useState<GridRowsProp<NutrientGroup>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    setIsLoading(true);
    try {
      nutrient_group_service.get().then((response) => {
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
      const response = await nutrient_group_service.delete(id);
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

export default NutrientGroupList;
