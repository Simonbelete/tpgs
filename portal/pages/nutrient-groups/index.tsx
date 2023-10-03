import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import {
  NutrientGroupList,
  NutrientGroupListFilter,
  NutrientGroupImportExport,
} from "@/features/nutrient-group";
import { SeoHead } from "@/seo";

const NutrientGroupPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Nutrient Group"/>
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Nutrient Group</Typography>}
        actions={<NutrientGroupImportExport />}
        filter={<NutrientGroupListFilter />}
      >
        <NutrientGroupList />
      </ListLayout>
    </>
  );
};



export default NutrientGroupPage;