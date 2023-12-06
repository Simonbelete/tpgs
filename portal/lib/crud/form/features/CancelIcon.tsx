import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import CancelIcon from "@mui/icons-material/Cancel";

export default function CancelIconMenu() {
  const router = useRouter();

  return (
    <Tooltip title="Cancel">
      <Link href={`${router.pathname.split("/[id]")[0]}/`}>
        <IconButton color="secondary">
          <CancelIcon />
        </IconButton>
      </Link>
    </Tooltip>
  );
}
