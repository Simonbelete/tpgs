import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Typography, Stack, Chip } from "@mui/material";
import Link from "next/link";
import dayjs from 'dayjs'

const typeMapper = {
  "+": {
    label: "Created",
    color: 'success'
  },
  "~": {
    label: "Updated",
    color: "info",
  },
  "-": {
    label: "Deleted",
    color: "error"
  }
}

const columns: GridColDef[] = [
  { field: "history_date", headerName: "Action Date", flex: 1, minWidth: 150,
  valueGetter: (params) =>
    params.row.history_date ? dayjs(params.row.history_date).format(process.env.NEXT_PUBLIC_DATE_FORMAT) : "",
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
  { field: "history_change_reason", headerName: "Change Reason", flex: 1, minWidth: 150 },
  {
    field: "history_type",
    headerName: "Type",
    flex: 1,
    minWidth: 150,
    renderCell: (params: GridRenderCellParams<any>) => {
      return (
        <Stack direction="row" spacing={1}>
          {params.row.history_type &&
            // @ts-ignore
              <Chip variant="outlined" label={typeMapper[params.row.history_type].label} size="small" color={typeMapper[params.row.history_type].color}/>
          }
        </Stack>
      );
    },
  },
];

export default columns;
