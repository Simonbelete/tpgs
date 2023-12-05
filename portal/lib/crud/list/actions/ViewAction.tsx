import React from "react";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { Tooltip, IconButton } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import VisibilityIcon from "@mui/icons-material/Visibility";

const ViewAction: React.FC<GridRenderCellParams & { path?: string }> = ({
  id,
  path,
}) => {
  // TODO: use passed basePath
  const router = useRouter();

  const pathname = path == null ? router.pathname : path;

  return (
    <Link href={`${pathname}/${id}`} data-testid="data-table-view">
      <Tooltip title="View">
        <IconButton aria-label="View">
          <VisibilityIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Link>
  );
};

export default ViewAction;
