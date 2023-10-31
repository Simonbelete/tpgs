import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";

export default function HistoryIcon() {
  const router = useRouter();

  return (
    <Tooltip title="Histories">
      <Link
        href={`${router.pathname.split("/[id]")[0]}/${
          router.query.id
        }/histories`}
      >
        <IconButton color="secondary">
          <ManageHistoryIcon />
        </IconButton>
      </Link>
    </Tooltip>
  );
}
