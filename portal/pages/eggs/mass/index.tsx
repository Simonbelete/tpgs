import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import {
  EggList,
  EggListFilter,
  EggImportExport,
  MassEggImportExport
} from "@/features/eggs";
import { SeoHead } from "@/seo";

const EggMassPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Mass Egg Production"/>
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Mass Egg Production</Typography>}
        actions={<MassEggImportExport />}
        filter={<EggListFilter />}
      >
        <EggList mass />
      </ListLayout>
    </>
  );
};



export default EggMassPage;