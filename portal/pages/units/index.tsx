import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import {
  UnitList,
  UnitListFilter,
  UnitImportExport,
} from "@/features/units";
import { SeoHead } from "@/seo";

const UnitPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Units"/>
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Units</Typography>}
        actions={<UnitImportExport />}
        filter={<UnitListFilter />}
      >
        <UnitList />
      </ListLayout>
    </>
  );
};



export default UnitPage;