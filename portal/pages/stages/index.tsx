import React, { ReactElement, useRef } from "react";
import Link from "next/link";
import { Typography, Button, IconButton, Stack } from "@mui/material";
import { useBreadcrumbs } from "@/hooks";
import { ListLayout, Breadcrumbs, Loading } from "@/components";
import { StagesDnD } from "@/features/stages";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const StagesPage = () => {
  const { breadcrumbs } = useBreadcrumbs();
  const createRef = useRef();

  return (
    <ListLayout
      breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
      header={<Typography variant="title">Stages</Typography>}
      actions={
        <Actions
          onCreate={() => {
            if (createRef.current != undefined)
              (createRef.current as any).add();
          }}
        />
      }
    >
      <StagesDnD createRef={createRef} />
    </ListLayout>
  );
};

const Actions = ({ onCreate }: { onCreate: () => void }): ReactElement => {
  return (
    <Stack
      spacing={2}
      direction={"row"}
      justifyContent="flex-start"
      alignItems="center"
    >
      <Button variant="contained" startIcon={<AddIcon />} onClick={onCreate}>
        Create
      </Button>
      <Button startIcon={<DownloadIcon />} size="small">
        Export
      </Button>
      <Button startIcon={<FileUploadIcon />} size="small">
        Import
      </Button>
    </Stack>
  );
};

export default StagesPage;
