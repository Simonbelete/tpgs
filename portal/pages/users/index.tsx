import React, { ReactElement, useState } from "react";
import { Typography, Button, IconButton, Stack } from "@mui/material";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs, Loading } from "@/components";
import { ListLayout } from "@/layouts";
import { UserList } from "@/features/users";
import { SeoHead } from "@/seo";
import { withClientGroup } from "@/hoc";
import { GROUP_ADMIN } from '@/constants';
import SendIcon from "@mui/icons-material/Send";
import {
  InvitationFormModal,
} from "@/features/invitations";

const UsersPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Users" />
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Users</Typography>}
        actions={<Actions />}
      >
        <UserList />
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
      <SeoHead title="Invitations"/>
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

export default withClientGroup(UsersPage, [GROUP_ADMIN]);

