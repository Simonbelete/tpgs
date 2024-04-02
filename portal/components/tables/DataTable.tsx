import React, { useCallback, useState } from "react";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridToolbar,
  gridClasses,
  DataGridProps,
} from "@mui/x-data-grid";
import { Box, IconButton, LinearProgress, Tooltip } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
// import DeleteIcon from "@mui/icons-material/DeleteForever";
import Link from "next/link";
import { useRouter } from "next/router";
import { DeleteModal } from "../modals";
import HistoryIcon from "@mui/icons-material/History";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
// import AnalyticsOutlinedIcon from "@mui/icons-material/Analytics";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.root}`]: {
    background: "red",
    height: "300px",
  },
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    "&:hover, &.Mui-hovered": {
      // backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    "&.Mui-selected": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
      "&:hover, &.Mui-hovered": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity
        ),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  },
  [`& .${gridClasses.columnHeaderTitle}`]: {
    fontWeight: 600,
    fontSize: "14px",
  },
  [`& .${gridClasses.cell}`]: {
    "&:focus, &:focus-within": {
      outline: "none",
    },
  },
  [`& .${gridClasses.columnHeader}`]: {
    "&:focus, &:focus-within": {
      outline: "none",
    },
  },
}));

const StyledGridOverlay = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  "& .ant-empty-img-1": {
    fill: theme.palette.mode === "light" ? "#aeb8c2" : "#262626",
  },
  "& .ant-empty-img-2": {
    fill: theme.palette.mode === "light" ? "#f5f5f7" : "#595959",
  },
  "& .ant-empty-img-3": {
    fill: theme.palette.mode === "light" ? "#dce0e6" : "#434343",
  },
  "& .ant-empty-img-4": {
    fill: theme.palette.mode === "light" ? "#fff" : "#1c1c1c",
  },
  "& .ant-empty-img-5": {
    fillOpacity: theme.palette.mode === "light" ? "0.8" : "0.08",
    fill: theme.palette.mode === "light" ? "#f5f5f5" : "#fff",
  },
}));

function CustomNoRowsOverlay() {
  return (
    <StyledGridOverlay>
      <svg
        width="120"
        height="100"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse
              className="ant-empty-img-5"
              cx="67.797"
              cy="106.89"
              rx="67.797"
              ry="12.668"
            />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <Box sx={{ mt: 1 }}>No Rows</Box>
    </StyledGridOverlay>
  );
}

export enum SETTING_COL {
  default = "default",
  history = "history",
  delete = "delete",
  basic = "basic",
  edit = "edit",
  email = "email",
  dashboard = "dashboard",
  editDelete = "editDelete",
}

const DataTable = ({
  rows,
  columns,
  onDelete,
  onResendEmail,
  setting = SETTING_COL.default,
  ...props
}: DataGridProps & {
  onDelete?: (id: number) => void;
  onResendEmail?: (id: number) => void;
  setting?: SETTING_COL;
}) => {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<number>(0);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const handleDeleteModalOpen = (id: number) => {
    setDeleteId(id);
    setDeleteOpen(true);
  };
  const handleDeleteModalClose = () => setDeleteOpen(false);

  const handleOnDelete = useCallback(() => {
    onDelete != undefined ? onDelete(deleteId) : {};
    handleDeleteModalClose();
  }, [onDelete, deleteId]);

  const handleOnResendEmail = useCallback(
    (id: number) => {
      onResendEmail != undefined ? onResendEmail(id) : {};
    },
    [onResendEmail]
  );

  const generateSettingColumns = (): GridColDef[] => {
    let col: GridColDef;
    switch (setting) {
      case SETTING_COL.default:
        col = {
          field: "Actions",
          flex: 1,
          minWidth: 150,
          headerAlign: "center",
          align: "right",
          renderCell(params: any) {
            return (
              <Box>
                <Link
                  href={router.pathname + "/" + params.id + "/edit"}
                  id="data-table-edit"
                >
                  <Tooltip title="Edit">
                    <IconButton aria-label="edit">
                      <DriveFileRenameOutlineIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Link>
                <Link
                  href={router.pathname + "/" + params.id}
                  id="data-table-view"
                >
                  <Tooltip title="View">
                    <IconButton aria-label="view">
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Link>
                <Link
                  href={`${router.pathname}/${params.id}/histories`}
                  id="data-table-histories"
                >
                  <Tooltip title="History">
                    <IconButton aria-label="history">
                      <HistoryIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Link>
                <Tooltip title="Delete" id="data-table-delete">
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDeleteModalOpen(params.id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            );
          },
        };
        break;
      case SETTING_COL.basic:
        col = {
          field: "Actions",
          flex: 1,
          minWidth: 150,
          headerAlign: "center",
          align: "right",
          renderCell(params: any) {
            return (
              <Box>
                <Link
                  href={router.pathname + "/" + params.id + "/edit"}
                  id="data-table-edit"
                >
                  <Tooltip title="Edit">
                    <IconButton aria-label="edit">
                      <DriveFileRenameOutlineIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Link>
                <Link
                  href={`${router.pathname}/${params.id}/histories`}
                  id="data-table-histories"
                >
                  <Tooltip title="History">
                    <IconButton aria-label="history">
                      <HistoryIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Link>
                <Tooltip title="Delete" id="data-table-delete">
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDeleteModalOpen(params.id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            );
          },
        };
        break;
      case SETTING_COL.edit:
        col = {
          field: "Actions",
          flex: 1,
          minWidth: 150,
          headerAlign: "center",
          align: "right",
          renderCell(params: any) {
            return (
              <Box>
                <Link
                  href={router.pathname + "/" + params.id + "/edit"}
                  id="data-table-edit"
                >
                  <Tooltip title="Edit">
                    <IconButton aria-label="edit">
                      <DriveFileRenameOutlineIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Link>
              </Box>
            );
          },
        };
        break;
      case SETTING_COL.email:
        col = {
          field: "Actions",
          flex: 1,
          minWidth: 150,
          headerAlign: "center",
          align: "right",
          renderCell(params: any) {
            return (
              <Box>
                <Tooltip title="Resend Email">
                  <IconButton
                    disabled={params.row.accepted}
                    aria-label="resend-email"
                    onClick={() => handleOnResendEmail(params.id)}
                  >
                    <ScheduleSendIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton
                    disabled={params.row.accepted}
                    aria-label="delete"
                    onClick={() => handleDeleteModalOpen(params.id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            );
          },
        };
        break;
      case SETTING_COL.delete:
        col = {
          field: "Actions",
          flex: 1,
          minWidth: 150,
          headerAlign: "center",
          align: "right",
          renderCell(params: any) {
            return (
              <Box>
                <Tooltip title="Delete">
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDeleteModalOpen(params.id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            );
          },
        };
        break;
      case SETTING_COL.dashboard:
        col = {
          field: "Actions",
          flex: 1,
          minWidth: 150,
          headerAlign: "center",
          align: "right",
          renderCell(params) {
            return (
              <Box>
                <Link
                  href={router.pathname + "/" + params.id + "/dashboard"}
                  id="data-table-edit"
                >
                  <Tooltip title="Dashboard">
                    <IconButton aria-label="edit">
                      <AnalyticsOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Link>
                <Link
                  href={router.pathname + "/" + params.id + "/edit"}
                  id="data-table-edit"
                >
                  <Tooltip title="Edit">
                    <IconButton aria-label="edit">
                      <DriveFileRenameOutlineIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Link>
                <Link
                  href={`${router.pathname}/${params.id}/histories`}
                  id="data-table-histories"
                >
                  <Tooltip title="History">
                    <IconButton aria-label="history">
                      <HistoryIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Link>
                <Tooltip title="Delete" id="data-table-delete">
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDeleteModalOpen(Number(params.id))}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            );
          },
        };
        break;
      default:
        // @ts-ignore
        col = {
          // field: "Actions",
          // flex: 1,
          // minWidth: 150,
          // headerAlign: "center",
          // align: "right",
        };
    }
    const result: GridColDef[] = [col];
    return result;
  };

  const settingColumn: GridColDef[] = generateSettingColumns();

  const getRowById = (row: any) => {
    if (setting == SETTING_COL.history) return row.history_id;
    return row.id;
  };

  return (
    <>
      <DeleteModal
        open={deleteOpen}
        onClose={handleDeleteModalClose}
        onYes={handleOnDelete}
      />
      <StripedDataGrid
        sx={{ background: "white", height: "100%" }}
        rows={rows}
        density="compact"
        rowHeight={55}
        columns={[...columns, ...settingColumn]}
        paginationMode="server"
        disableRowSelectionOnClick
        slots={{
          noRowsOverlay: CustomNoRowsOverlay,
          loadingOverlay: LinearProgress,
        }}
        // getRowClassName={(params) =>
        //   params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        // }
        getRowId={props.getRowId && getRowById}
        {...props}
      />
    </>
  );
};

DataTable.SETTING_COL = SETTING_COL;

export default DataTable;
