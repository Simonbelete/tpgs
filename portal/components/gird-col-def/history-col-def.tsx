import { GridRowsProp, GridColDef, GridToolbar } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "history_date", headerName: "Action Date", flex: 1, minWidth: 150 },
  {
    field: "history_user",
    headerName: "Performed by",
    flex: 1,
    minWidth: 150,
    valueGetter: (params) =>
      params.row.history_user ? params.row.history_user.name : "",
  },
];

export default columns;
