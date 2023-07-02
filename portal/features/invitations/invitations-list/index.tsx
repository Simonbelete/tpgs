import React, { useEffect, useState } from "react";
import { GridRowsProp, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { DataTable } from "@/components/tables";
import { Invitation } from "@/models";
import invitation_service from "../services/invitation_service";

const columns: GridColDef[] = [
  { field: "email", headerName: "Email", flex: 1, minWidth: 150 },
  { field: "sent_date", headerName: "Date", flex: 1, minWidth: 150 },
  {
    field: "unit_to",
    headerName: "Unit To",
    flex: 1,
    minWidth: 150,
    valueGetter: (params) => params.row.inviter.name ?? "",
  },
  { field: "accepted", headerName: "Accepted", flex: 1, minWidth: 150 },
];

const InvitationsList = () => {
  const [rows, setRows] = useState<GridRowsProp<Invitation>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    setIsLoading(true);

    invitation_service
      .get()
      .then((response) => {
        setRows(response.data.results);
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  }, [paginationModel]);

  const refresh = () => {
    setPaginationModel({ page: 0, pageSize: 10 });
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await invitation_service.delete(id);
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

export default InvitationsList;
