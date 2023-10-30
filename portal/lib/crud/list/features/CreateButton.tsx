import React from "react";
import Link from "next/link";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export interface CreateButtonProps {
  baseUrl: string;
}

const CreateButton = ({ baseUrl }: CreateButtonProps) => {
  return (
    <Link href={`${baseUrl}/create`}>
      <Button variant="contained" size={"small"} startIcon={<AddIcon />}>
        Create
      </Button>
    </Link>
  );
};

export default CreateButton;
