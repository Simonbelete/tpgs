import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import {
  RequirementList,
  RequirementListFilter,
  RequirementImportExport,
} from "@/features/requirements";
import { SeoHead } from "@/seo";

const RequirementPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Requirement" />
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Requirement</Typography>}
        actions={<RequirementImportExport />}
        filter={<RequirementListFilter />}
      >
        <RequirementList />
      </ListLayout>
    </>
  );
};

export default RequirementPage;
