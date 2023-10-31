import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";

export default function CreateNewIcon() {
  const router = useRouter();

  return (
    <Tooltip title="Create new">
      <Link href={`${router.pathname.split("/[id]")[0]}/create`}>
        <IconButton color="secondary">
          <LibraryAddIcon />
        </IconButton>
      </Link>
    </Tooltip>
  );
}
