import React, { ReactElement, useState } from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import {
  ListLayout,
  PermanentlyDeleteAction,
  EditAction,
  HistoryAction,
} from "@/lib/crud";
import { userApi } from "../services";
import { User, Farm, Group } from "@/models";
import { Button, Chip, Stack } from "@mui/material";
import { SeoHead } from "@/seo";
import SendIcon from "@mui/icons-material/Send";
import { InvitationFormModal } from "@/features/invitations";
import dayjs from "dayjs";

const Actions = (): ReactElement => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <>
      <SeoHead title="Invitations" />
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

export const UserList = () => {
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 150 },
    {
      field: "farms",
      headerName: "Farms",
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams<any>) => {
        if (!Array.isArray(params.row.farms)) return <></>;
        return (
          <Stack direction="row" spacing={1}>
            {params.row.farms &&
              params.row.farms.map((e: Farm, key: any) => (
                <Chip key={key} label={e.name} size="small" />
              ))}
          </Stack>
        );
      },
    },
    {
      field: "groups",
      headerName: "Groups",
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams<any>) => {
        if (!Array.isArray(params.row.groups)) return <></>;
        return (
          <Stack direction="row" spacing={1}>
            {params.row.groups &&
              params.row.groups.map((e: Group, key: any) => (
                <Chip key={key} label={e.name} size="small" />
              ))}
          </Stack>
        );
      },
    },
    {
      field: "last_login",
      headerName: "Last Login",
      flex: 1,
      minWidth: 150,
      valueGetter: (params) =>
        params.row.last_login
          ? dayjs(params.row.last_login).format(
              process.env.NEXT_PUBLIC_DATETIME_FORMAT
            )
          : "",
    },
  ];
  return (
    <ListLayout<User>
      title="User"
      columns={columns}
      actions={[EditAction, HistoryAction, PermanentlyDeleteAction]}
      getEndpoint={userApi.endpoints.getUsers}
      deleteEndpoint={userApi.endpoints.deleteUser}
      filters={{}}
      menus={
        <>
          <Actions />
        </>
      }
    />
  );
};
