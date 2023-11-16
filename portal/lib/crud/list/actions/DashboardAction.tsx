import React from "react";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { Tooltip, IconButton } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";

const DashboardAction: React.FC<GridRenderCellParams> = ({ id }) => {
  // TODO: use passed basePath
  const router = useRouter();
  return (
    <Link
      href={`${router.pathname}/${id}/dashboard`}
      data-testid="data-table-dashboard"
    >
      <Tooltip title="Dashboard">
        <IconButton aria-label="edit">
          <AnalyticsOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Link>
  );
};

export default DashboardAction;
