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
import { Breadcrumbs, Loading } from "@/components";
import { ListLayout } from '@/layouts';
import {
  InvitationList,
  InvitationListFilter,
  InvitationFormModal,
} from "@/features/invitations";
import SendIcon from "@mui/icons-material/Send";
import { SeoHead } from '@/seo';
import { withClientGroup } from "@/hoc";
import { GROUP_ADMIN } from '@/constants';

const InvitationPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Invitations"/>
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Invitations</Typography>}
        actions={<Actions />}
        filter={<InvitationListFilter />}
      >
        <InvitationList />
      </ListLayout>
    </>
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
          id="invite-user-button"
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

export default InvitationPage;

// export default withClientGroup(InvitationPage, [GROUP_ADMIN]);
