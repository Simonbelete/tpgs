import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Typography, Stack, Chip } from "@mui/material";
import Link from "next/link";
import dayjs from "dayjs";

const typeMapper = {
  "+": {
    label: "Created",
    color: "success",
  },
  "~": {
    label: "Updated",
    color: "info",
  },
  "-": {
    label: "Deleted",
    color: "error",
  },
};

const columns: GridColDef[] = [
  {
    field: "history_date",
    headerName: "Action Date",
    flex: 1,
    minWidth: 150,
    valueGetter: (value, row) =>
      row.history_date
        ? dayjs(row.history_date).format(process.env.NEXT_PUBLIC_DATE_FORMAT)
        : "",
  },
  {
    field: "history_user",
    headerName: "Performed by",
    flex: 1,
    minWidth: 150,
    renderCell: (params: GridRenderCellParams<any>) => {
      if (params.row.history_user == null) return <></>;
      return (
        <Typography color={"link.primary"} variant="body2">
          <Link href={`/users/${params.row.history_user.id}`}>
            {params.row.history_user.name}
          </Link>
        </Typography>
      );
    },
  },
  {
    field: "history_change_reason",
    headerName: "Change Reason",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "history_type",
    headerName: "Type",
    flex: 1,
    minWidth: 150,
    renderCell: (params: GridRenderCellParams<any>) => {
      return (
        <Stack direction="row" spacing={1}>
          {params.row.history_type && (
            <Chip
              variant="outlined"
              // @ts-ignore
              label={typeMapper[params.row.history_type].label}
              size="small"
              // @ts-ignore
              color={typeMapper[params.row.history_type].color}
            />
          )}
        </Stack>
      );
    },
  },
  {
    field: "is_active",
    headerName: "Active",
    flex: 1,
    minWidth: 150,
    renderCell: (params: GridRenderCellParams<any>) => {
      return (
        <Stack direction="row" spacing={1}>
          <Chip
            variant="outlined"
            label={params.row.is_active ? "Active" : "Deleted"}
            size="small"
            color={params.row.is_active ? "info" : "error"}
          />
        </Stack>
      );
    },
  },
];

export default columns;
