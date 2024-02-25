import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import { ImportJobList } from "@/features/import-export-job";
import { SeoHead } from "@/seo";

const ImportJobPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Import" />
      <ListLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <ImportJobList />
      </ListLayout>
    </>
  );
};

export default ImportJobPage;
