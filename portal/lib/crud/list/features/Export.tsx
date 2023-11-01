import React from "react";
import { ButtonMenu } from "@/components/buttons";
import DownloadIcon from "@mui/icons-material/Download";
import { AxiosResponse } from "axios";
import { Typography } from "@mui/material";
import fileDownload from "@/util/fileDownload";
import { useSnackbar } from "notistack";

export interface ExportProps {
  exportCsv: () => Promise<AxiosResponse>;
  exportXlsx: () => Promise<AxiosResponse>;
  exportXls: () => Promise<AxiosResponse>;
}

const Export = ({ exportCsv, exportXlsx, exportXls }: ExportProps) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleExport = async (type: string) => {
    try {
      let response: Partial<AxiosResponse> = {};
      if (type == "xlsx") response = await exportCsv();
      if (type == "xls") response = await exportXlsx();
      if (type == "csv") response = await exportXls();
      if (response.status == 200) {
        fileDownload(response.data as any, `export_.${type}`);
      } else {
        enqueueSnackbar(
          "Error: Failed to download data, try changing to the correct farm",
          { variant: "error" }
        );
      }
    } catch (ex) {
      enqueueSnackbar(
        "Failed to Export, please check you network and try again",
        { variant: "error" }
      );
    }
  };

  return (
    <>
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
    </>
  );
};

export default Export;
