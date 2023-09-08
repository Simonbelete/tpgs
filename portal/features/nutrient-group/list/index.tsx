import React, { useEffect, useState } from "react";
import { GridRowsProp, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { DataTable } from "@/components/tables";
import service from "../services/nutrient_group_service";
import { NutrientGroup } from "@/models";
import { useSnackbar } from "notistack";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import _ from "lodash";

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
];

const NutrientGroupList = () => {
  const [rows, setRows] = useState<GridRowsProp<NutrientGroup>>([]);
  const [rowCount, setRowCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const filter = useSelector((state: RootState) => state.nutrientGroupFilter);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
     loadData().finally(() => {
      setIsLoading(false);
     })

     return () => {
      controller.abort()
    }
  }, [paginationModel, filter]);

  const loadData = async () => {
    // Build Filters
    let filterQuery: any = {}

    // Page Builder
    const offset = paginationModel.page * paginationModel.pageSize;
    const pageQuery = {...{limit: paginationModel.pageSize, offset: offset}, ...(_.isEmpty(filterQuery) ? {}: {offset: null, limit: null})}
    const searchQuery = filter.search != "" ? {search: filter.search} : {}

    const response = await service.get({...pageQuery, ...filterQuery, ...searchQuery})
    if(response.status == 200) {
      setRows(response.data.results);
      setRowCount(response.data.count || 0);
    }
  }

  const refresh = () => {
    setPaginationModel({ page: 0, pageSize: 10 });
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await service.delete(id);
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
      pageSizeOptions={[5, 10, 25, 50, 100]}
      paginationModel={paginationModel}
      paginationMode="server"
      onPaginationModelChange={setPaginationModel}
    />
  );
};

export default NutrientGroupList;
