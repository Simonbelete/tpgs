import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import {
  FormulaList,
  FormulaListFilter,
  FormulaImportExport,
} from "@/features/formula";
import { SeoHead } from "@/seo";

const FormulaPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Formulas"/>
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Formulas</Typography>}
        actions={<FormulaImportExport />}
        filter={<FormulaListFilter />}
      >
        <FormulaList />
      </ListLayout>
    </>
  );
};



export default FormulaPage;