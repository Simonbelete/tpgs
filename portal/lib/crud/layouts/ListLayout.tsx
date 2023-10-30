import React from "react";
import {
  ListProps,
  FilterProps,
  List,
  Filter,
  CreateButton,
  CreateButtonProps,
  Export,
  ExportProps,
  Import,
  ImportProps,
} from "../list/";
import { Grid, Box, Typography, Stack } from "@mui/material";

interface ListLayoutProps<T>
  extends ListProps<T>,
    FilterProps<T>,
    CreateButtonProps,
    ExportProps,
    ImportProps {
  title: string;
}

export default function ListLayout<T>({
  title,
  columns,
  actions,
  getEndpoint,
  deleteEndpoint,
  filters,
  baseUrl,
  exportCsv,
  exportXls,
  exportXlsx,
  importCsv,
  importXls,
  importXlsx,
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
            <CreateButton baseUrl={baseUrl} />
            <Export
              exportCsv={exportCsv}
              exportXls={exportXls}
              exportXlsx={exportXlsx}
            />
            <Import
              importCsv={importCsv}
              importXls={importXls}
              importXlsx={importXlsx}
            />
          </Stack>
        </Grid>
      </Grid>
      <Box sx={{ my: 5 }}>
        <Filter filters={filters} />
      </Box>
      <div style={{ minHeight: "400px" }}>
        <List
          columns={columns}
          actions={actions}
          getEndpoint={getEndpoint}
          deleteEndpoint={deleteEndpoint}
        />
      </div>
    </>
  );
}
