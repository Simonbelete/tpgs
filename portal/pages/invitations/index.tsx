import React, { ReactElement, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Typography, Button, IconButton, Stack } from "@mui/material";
import { useBreadcrumbs } from "@/hooks";
import { ListLayout, Breadcrumbs, Loading } from "@/components";
import { InvitationsList, InvitationFormModal } from "@/features/invitations";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import SendIcon from "@mui/icons-material/Send";

const UnitsPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <ListLayout
      breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
      header={<Typography variant="title">Invitations</Typography>}
      actions={<Actions />}
    >
      <InvitationsList />
    </ListLayout>
  );
};

const Actions = (): ReactElement => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <>
      <InvitationFormModal open={openModal} onClose={handleCloseModal} />
      <Stack
        spacing={2}
        direction={"row"}
        justifyContent="flex-start"
        alignItems="center"
      >
        <Button
          variant="contained"
          size="small"
          startIcon={<SendIcon />}
          onClick={handleOpenModal}
        >
          Send Invitation
        </Button>
        <Button startIcon={<DownloadIcon />} size="small">
          Export
        </Button>
        <Button startIcon={<FileUploadIcon />} size="small">
          Import
        </Button>
      </Stack>
    </>
  );
};

export default UnitsPage;
