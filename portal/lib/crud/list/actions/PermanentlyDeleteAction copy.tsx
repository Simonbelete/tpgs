import React from "react";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { Tooltip, IconButton } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

const PermanentlyDeleteAction: React.FC<
  GridRenderCellParams & {
    onClick?: (id: number) => void;
  }
> = ({ id, onClick }) => {
  // TODO: use passed basePath
  const router = useRouter();
  return (
    <Tooltip title="Delete" id="data-table-delete">
      <IconButton
        aria-label="delete"
        onClick={() => onClick && onClick(id as any)}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};

export default PermanentlyDeleteAction;
