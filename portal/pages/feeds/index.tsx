import React, { ChangeEvent, ReactElement } from "react";
import { AxiosResponse } from "axios";
import Link from "next/link";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Button, Typography, Stack } from "@mui/material";
import { FeedList, FeedService } from "@/features/feeds";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { ButtonMenu } from "@/components/buttons";
import { useSnackbar } from "notistack";
import messages from "@/util/messages";
import fileDownload from "@/util/fileDownload";

const FeedPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <ListLayout
      breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
      header={<Typography variant="title">Feeds</Typography>}
      actions={<Actions />}
    >
      <FeedList />
    </ListLayout>
  );
};

const Actions = (): ReactElement => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleExport = async (type: string) => {
    try {
      let response: Partial<AxiosResponse> = {};
      if (type == "xlsx") response = await FeedService.export.xlsx();
      if (type == "xls") response = await FeedService.export.xls();
      if (type == "csv") response = await FeedService.export.csv();
      if (response.status == 200) {
        fileDownload(response.data, `nutrient_groups.${type}`);
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
          response = await FeedService.import.xlsx(formData);
        if (file.name.includes(".xls"))
          response = await FeedService.import.xls(formData);
        if (file.name.includes(".csv"))
          response = await FeedService.import.csv(formData);
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
      >
        <Link href="/feeds/create">
          <Button variant="contained" startIcon={<AddIcon />}>
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
                  <Typography color={"black"}>Csv (.csv)</Typography>
                </>
              ),
            },
            {
              onClick: async () => await handleExport("xlsx"),
              children: (
                <>
                  <Typography color={"black"}>Excel (.xlsx)</Typography>
                </>
              ),
            },
            {
              onClick: async () => await handleExport("xls"),

              children: (
                <>
                  <Typography color={"black"}>Excel (.xls)</Typography>
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

export default FeedPage;
