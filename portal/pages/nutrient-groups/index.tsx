import React, { ReactElement } from "react";
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
import { MenuItem } from "react-pro-sidebar";
import { IconContext } from "react-icons";

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
              children: (
                <>
                  <Link href={""}>Csv</Link>
                </>
              ),
            },
          ]}
        />
        <Button startIcon={<DownloadIcon />} size="small">
          Export
        </Button>
        <Button startIcon={<FileUploadIcon />} size="small">
          Import
        </Button>
      </Stack>
    </>
  );
};

export default NutrientGroupPage;
