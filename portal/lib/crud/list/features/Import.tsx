import React, { useState, ChangeEvent } from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Button } from "@mui/material";
import { AxiosResponse } from "axios";
import { useSnackbar } from "notistack";

export interface ImportProps {
  importCsv: (data: FormData) => Promise<AxiosResponse>;
  importXlsx: (data: FormData) => Promise<AxiosResponse>;
  importXls: (data: FormData) => Promise<AxiosResponse>;
}

const Import = ({ importCsv, importXlsx, importXls }: ImportProps) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [responseHtml, setResponseHtml] = useState({
    open: false,
    html: "",
  });

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target != null && event.target.files != null) {
      const allowedExtensions = /(\.csv|\.xlsx|\.xls)$/i;
      const target = event.target as HTMLInputElement;
      const file = target.files != null ? target.files[0] : null;

      if (file == null) return;

      if (!allowedExtensions.test(file.name)) {
        enqueueSnackbar("Please select file type either csv or excel", {
          variant: "error",
        });
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      try {
        let response: Partial<AxiosResponse> = {};
        if (file.name.includes(".xlsx")) response = await importXlsx(formData);
        if (file.name.includes(".xls")) response = await importXls(formData);
        if (file.name.includes(".csv")) response = await importCsv(formData);
        if (response.status == 200) {
          setResponseHtml({
            open: true,
            html: response.data,
          });
          enqueueSnackbar("Successfully imported", { variant: "success" });
        } else {
          enqueueSnackbar(
            "Error: Failed to import data, try changing to the correct farm or check you file",
            { variant: "error" }
          );
        }
      } catch (ex) {
        enqueueSnackbar(
          "Failed to Export, please check you network and try again",
          { variant: "error" }
        );
      }
    } else {
      enqueueSnackbar("Please select a file", { variant: "error" });
    }
  };
  return (
    <Button startIcon={<FileUploadIcon />} size="small" component="label">
      Import
      <input
        type="file"
        onChange={handleFileUpload}
        accept=".csv,.xlsx,.xls"
        hidden
      />
    </Button>
  );
};

export default Import;
