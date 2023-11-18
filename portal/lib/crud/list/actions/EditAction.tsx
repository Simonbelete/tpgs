import React from "react";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { Tooltip, IconButton } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

const EditAction: React.FC<GridRenderCellParams & { path?: string }> = ({
  id,
  path,
}) => {
  // TODO: use passed basePath
  const router = useRouter();

  const pathname = path == null ? router.pathname : path;

  return (
    <Link href={`${pathname}/${id}/edit`} data-testid="data-table-edit">
      <Tooltip title="Edit">
        <IconButton aria-label="edit">
          <DriveFileRenameOutlineIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Link>
  );
};

export default EditAction;
