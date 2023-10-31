import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import { RequirementList } from "@/features/requirements";
import { SeoHead } from "@/seo";

const RequirementPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Requirement" />
      <ListLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <RequirementList />
      </ListLayout>
    </>
  );
};

export default RequirementPage;
