import React, { ChangeEvent, useState } from "react";
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
  exportIngredientsXLSX,
  exportIngredientsXLS,
  exportIngredientsCSV,
  importIngredientsXLSX,
  importIngredientsCSV,
  importIngredientsXLS,
} from "../services";
import { HtmlModal } from "@/components";

const IngredientImportExport = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [responseHtml, setResponseHtml] = useState({
    open: false,
    html: "",
  });

  const handleExport = async (type: string) => {
    try {
      let response: Partial<AxiosResponse> = {};
      if (type == "xlsx") response = await exportIngredientsXLSX();
      if (type == "xls") response = await exportIngredientsXLS();
      if (type == "csv") response = await exportIngredientsCSV();
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
          response = await importIngredientsXLSX(formData);
        if (file.name.includes(".xls"))
          response = await importIngredientsXLS(formData);
        if (file.name.includes(".csv"))
          response = await importIngredientsCSV(formData);
        if (response.status == 200) {
          setResponseHtml({
            open: true,
            html: response.data,
          });
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
      <HtmlModal
        open={responseHtml.open}
        onClose={() => setResponseHtml({ open: false, html: "" })}
        html={responseHtml.html}
      />
      <Stack
        spacing={2}
        direction={"row"}
        justifyContent="flex-start"
        alignItems="center"
        useFlexGap
        flexWrap="wrap"
      >
        <Link href="/ingredients/create">
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

export default IngredientImportExport;
