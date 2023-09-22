import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import {
  PurposeList,
  PurposeListFilter,
  PurposeImportExport,
} from "@/features/purposes";
import { SeoHead } from "@/seo";

const PurposePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Purposes"/>
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Purposes</Typography>}
        actions={<PurposeImportExport />}
        filter={<PurposeListFilter />}
      >
        <PurposeList />
      </ListLayout>
    </>
  );
};



export default PurposePage;