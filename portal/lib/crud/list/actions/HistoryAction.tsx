import React from "react";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { Tooltip, IconButton } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import HistoryIcon from "@mui/icons-material/History";

const HistoryAction: React.FC<GridRenderCellParams> = ({ id }) => {
  // TODO: use passed basePath
  const router = useRouter();
  return (
    <Link
      href={`${router.pathname}/${id}/histories`}
      className="pts-list-history"
    >
      <Tooltip title="Dashboard">
        <IconButton aria-label="edit">
          <HistoryIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Link>
  );
};

export default HistoryAction;
