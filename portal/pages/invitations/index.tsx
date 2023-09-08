import React, { ReactElement, useState } from "react";
import {
  Typography,
  Button,
  IconButton,
  Stack,
  Box,
  Grid,
} from "@mui/material";
import { useBreadcrumbs } from "@/hooks";
import { ListLayout, Breadcrumbs, Loading } from "@/components";
import {
  InvitationsList,
  InvitationFormModal,
  InvitationFilter,
} from "@/features/invitations";
import SendIcon from "@mui/icons-material/Send";
import { SeoHead } from '@/seo';

const UnitsPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <ListLayout
      breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
      header={<Typography variant="title">Invitations</Typography>}
      actions={<Actions />}
      filter={<InvitationFilter />}
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
      <SeoHead title="Invitations"/>
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
      </Stack>
    </>
  );
};

export default UnitsPage;
