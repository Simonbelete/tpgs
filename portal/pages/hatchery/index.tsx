import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import {
  HatcheryList,
  HatcheryListFilter,
  HatcheryImportExport,
} from "@/features/hatchery";
import { SeoHead } from "@/seo";

const HatcheryPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Hatchery" />
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Hatchery</Typography>}
        actions={<HatcheryImportExport />}
        filter={<HatcheryListFilter />}
      >
        <HatcheryList />
      </ListLayout>
    </>
  );
};

export default HatcheryPage;
