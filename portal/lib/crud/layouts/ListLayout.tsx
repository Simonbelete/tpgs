import React from "react";
import {
  ListProps,
  FilterProps,
  List,
  Filter,
  CreateButton,
  CreateButtonProps,
  ExportProps,
  ImportProps,
} from "../list/";
import { Grid, Box, Typography, Stack } from "@mui/material";

interface ListLayoutProps<T> extends ListProps<T>, FilterProps<T> {
  title: string;
  menus?: React.ReactNode;
  baseUrl: string;
}

export default function ListLayout<T>({
  baseUrl,
  title,
  columns,
  actions,
  getEndpoint,
  deleteEndpoint,
  filters,
  menus,
  getRowId,
}: ListLayoutProps<T>) {
  return (
    <>
      <Grid container mb={5}>
        <Grid item xs={12} md={4}>
          <Box sx={{ display: "flex" }} justifyContent={"start"}>
            <Typography variant="title">{title}</Typography>
          </Box>
        </Grid>
        {/* <Box sx={{ flexGrow: 1 }} /> */}
        <Grid item xs={12} md />
        <Grid item xs={12} md={4}>
          <Stack
            direction="row"
            justifyContent={{ xs: "start", md: "end" }}
            spacing={2}
          >
            {menus}
            <CreateButton baseUrl={baseUrl} />
          </Stack>
        </Grid>
      </Grid>
      <Box sx={{ my: 5 }}>
        <Filter filters={filters} />
      </Box>
      <div style={{ minHeight: "400px" }}>
        <List
          getRowId={getRowId}
          columns={columns}
          actions={actions}
          getEndpoint={getEndpoint}
          deleteEndpoint={deleteEndpoint}
        />
      </div>
    </>
  );
}
