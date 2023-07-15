import React, { ReactElement } from "react";
import { AxiosResponse } from "axios";
import Link from "next/link";
import { ListLayout } from "@/components/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Button, Typography, Stack } from "@mui/material";
import {
  NutrientGroupList,
  NutrientGroupService,
} from "@/features/nutrient-group";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { ButtonMenu } from "@/components/buttons";
import { useSnackbar } from "notistack";
import messages from "@/util/messages";
import fileDownload from "@/util/fileDownload";

const NutrientGroupPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <ListLayout
      breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
      header={<Typography variant="title">Nutrients Group</Typography>}
      actions={<Actions />}
    >
      <NutrientGroupList />
    </ListLayout>
  );
};

const Actions = (): ReactElement => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleExport = async (type: string) => {
    try {
      let response: Partial<AxiosResponse> = {};
      if (type == "xlsx") response = await NutrientGroupService.export.xlsx();
      if (type == "xls") response = await NutrientGroupService.export.xls();
      if (type == "csv") response = await NutrientGroupService.export.csv();
      if (response.status == 200) {
        fileDownload(response.data, `nutrient_groups.${type}`);
      } else {
        enqueueSnackbar(messages.exportError_400(), { variant: "error" });
      }
    } catch (ex) {
      enqueueSnackbar(messages.exportError_500(), { variant: "error" });
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
        <Link href="/nutrient-groups/create">
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
        <Button startIcon={<FileUploadIcon />} size="small">
          Import
        </Button>
      </Stack>
    </>
  );
};

export default NutrientGroupPage;
