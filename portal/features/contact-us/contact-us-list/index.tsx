import React from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { ListLayout, ImportButton } from "@/lib/crud";
import { contactApi, URL } from "../services";
import { Contact } from "@/models";

export const ContactList = () => {
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "message", headerName: "Message", flex: 1 },
  ];
  return (
    <ListLayout<Contact>
      title="Contact us messages"
      columns={columns}
      actions={[]}
      getEndpoint={contactApi.endpoints.getContacts}
      filters={{}}
    />
  );
};
