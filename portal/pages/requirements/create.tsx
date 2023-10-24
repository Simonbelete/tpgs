import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { Breadcrumbs } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { CreateLayout } from "@/layouts";
import { RequirementForm } from "@/features/requirements";
import { SeoHead } from "@/seo";

const RequirementCreatePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Create Requirement" />
      <CreateLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Create Requirement</Typography>}
      >
        <RequirementForm />
      </CreateLayout>
    </>
  );
};

export default RequirementCreatePage;
