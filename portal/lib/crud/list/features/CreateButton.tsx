import React from "react";
import Link from "next/link";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";

export interface CreateButtonProps {}

const CreateButton = ({}: CreateButtonProps) => {
  const router = useRouter();
  return (
    <Link href={`${router.pathname}/create`}>
      <Button variant="contained" size={"small"} startIcon={<AddIcon />}>
        Create
      </Button>
    </Link>
  );
};

export default CreateButton;
