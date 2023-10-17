import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import { PenList, PenListFilter, PenImportExport } from "@/features/pen";
import { SeoHead } from "@/seo";

const PenPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Pen" />
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Pen</Typography>}
        actions={<PenImportExport />}
        filter={<PenListFilter />}
      >
        <PenList />
      </ListLayout>
    </>
  );
};

export default PenPage;
