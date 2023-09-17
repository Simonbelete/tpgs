import React, { ChangeEvent, ReactElement } from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Button, Typography, Stack } from "@mui/material";
import { FlocksList, FlockImportExport } from "@/features/flocks";
import { SeoHead } from "@/seo";

const FlockPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Flocks" />
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Flocks</Typography>}
        actions={<FlockImportExport />}
      >
        <FlocksList />
      </ListLayout>
    </>
  );
};


export default FlockPage;
