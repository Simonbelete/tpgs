import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import Link from "next/link";
import { useRouter } from "next/router";

export default function DashboardIcon() {
  const router = useRouter();

  return (
    <Tooltip title="Dashboard">
      <Link
        href={`${router.pathname.split("/[id]")[0]}/${
          router.query.id
        }/dashboard`}
      >
        <IconButton color="secondary">
          <AnalyticsIcon />
        </IconButton>
      </Link>
    </Tooltip>
  );
}
