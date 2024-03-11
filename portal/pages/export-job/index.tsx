import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import { ExportJobList } from "@/features/import-export-job";
import { SeoHead } from "@/seo";

const ExportJobPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Export Job" />
      <ListLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <ExportJobList />
      </ListLayout>
    </>
  );
};

export default ExportJobPage;
