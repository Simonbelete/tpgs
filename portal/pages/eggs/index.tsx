import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import {
  EggList,
  EggListFilter,
  EggImportExport,
} from "@/features/eggs";
import { SeoHead } from "@/seo";

const EggPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Egg Production"/>
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Egg Production</Typography>}
        actions={<EggImportExport />}
        filter={<EggListFilter />}
      >
        <EggList />
      </ListLayout>
    </>
  );
};



export default EggPage;