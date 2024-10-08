import React, { ChangeEvent, ReactElement } from "react";
import Link from "next/link";
import { AxiosResponse } from "axios";
import { useSnackbar } from "notistack";
import fileDownload from "@/util/fileDownload";
import { Button, Typography, Stack } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import messages from "@/util/messages";
import { ButtonMenu } from "@/components/buttons";
import AddIcon from "@mui/icons-material/Add";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { 
  exportHousesXLSX,
  exportHousesXLS,
  exportHousesCSV,
  importHousesXLSX,
  importHousesCSV,
  importHousesXLS
 } from "../services";

const HouseImportExport = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleExport = async (type: string) => {
    try {
      let response: Partial<AxiosResponse> = {};
      if (type == "xlsx") response = await exportHousesXLSX ();
      if (type == "xls") response = await exportHousesXLS();
      if (type == "csv") response = await exportHousesCSV();
      if (response.status == 200) {
        fileDownload(response.data, `houses_.${type}`);
      } else {
        enqueueSnackbar(messages.exportError_400(), { variant: "error" });
      }
    } catch (ex) {
      enqueueSnackbar(messages.exportError_500(), { variant: "error" });
    }
  };

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target != null && event.target.files != null) {
      const allowedExtensions = /(\.csv|\.xlsx|\.xls)$/i;
      const target = event.target as HTMLInputElement;
      const file = target.files != null ? target.files[0] : null;

      if (file == null) return;

      if (!allowedExtensions.test(file.name)) {
        enqueueSnackbar(messages.exportFileTypeError(), { variant: "error" });
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      try {
        let response: Partial<AxiosResponse> = {};
        if (file.name.includes(".xlsx"))
          response = await importHousesXLSX(formData);
        if (file.name.includes(".xls"))
          response = await importHousesXLS(formData);
        if (file.name.includes(".csv"))
          response = await importHousesCSV(formData);
        if (response.status == 200) {
          enqueueSnackbar(messages.importSuccess(), { variant: "success" });
        } else {
          enqueueSnackbar(messages.importError_400(), { variant: "error" });
        }
      } catch (ex) {
        enqueueSnackbar(messages.importError_500(), { variant: "error" });
      }
    } else {
      enqueueSnackbar(messages.fileNotSelected(), { variant: "error" });
    }
  };

  return (
    <>
      <Stack
        spacing={2}
        direction={"row"}
        justifyContent="flex-start"
        alignItems="center"
        useFlexGap flexWrap="wrap"
      >
        <Link href="/houses/create">
          <Button variant="contained" size={"small"} startIcon={<AddIcon />}>
            Create
          </Button>
        </Link>
        <ButtonMenu
          name="Export"
          startIcon={<DownloadIcon />}
          size="small"
          menus={[
            {
              onClick: async () => await handleExport("csv"),
              children: (
                <>
                  <Typography color={"secondary.main"} variant="body2">
                    Csv (.csv)
                  </Typography>
                </>
              ),
            },
            {
              onClick: async () => await handleExport("xlsx"),
              children: (
                <>
                  <Typography color={"secondary.main"} variant="body2">
                    Excel (.xlsx)
                  </Typography>
                </>
              ),
            },
            {
              onClick: async () => await handleExport("xls"),

              children: (
                <>
                  <Typography color={"secondary.main"} variant="body2">
                    Excel (.xls)
                  </Typography>
                </>
              ),
            },
          ]}
        />
        <Button startIcon={<FileUploadIcon />} size="small" component="label">
          Import
          <input
            type="file"
            onChange={handleFileUpload}
            accept=".csv,.xlsx,.xls"
            hidden
          />
        </Button>
      </Stack>
    </>
  );
};

export default HouseImportExport;
