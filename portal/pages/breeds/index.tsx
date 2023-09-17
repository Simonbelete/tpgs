import React, { ChangeEvent, ReactElement } from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Button, Typography, Stack } from "@mui/material";
import { BreedList, BreedImportExport } from "@/features/breeds";

const BreedPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <ListLayout
      breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
      header={<Typography variant="title">Breeds</Typography>}
      actions={<BreedImportExport />}
    >
      <BreedList />
    </ListLayout>
  );
};

export default BreedPage;
