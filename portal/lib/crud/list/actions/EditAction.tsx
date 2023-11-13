import React from "react";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { Tooltip, IconButton } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

const EditAction: React.FC<GridRenderCellParams> = ({ id }) => {
  // TODO: use passed basePath
  const router = useRouter();
  return (
    <Link href={`${router.pathname}/${id}/edit`} id="data-table-edit">
      <Tooltip title="Edit">
        <IconButton aria-label="edit">
          <DriveFileRenameOutlineIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Link>
  );
};

export default EditAction;
