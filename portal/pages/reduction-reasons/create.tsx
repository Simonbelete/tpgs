import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { Breadcrumbs } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { CreateLayout } from "@/layouts";
import { ReductionReasonForm } from "@/features/reduction-reason";
import { SeoHead } from "@/seo";

const ReductionReasonCreatePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Create " />
      <CreateLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Create </Typography>}
      >
        <ReductionReasonForm />
      </CreateLayout>
    </>
  );
};

export default ReductionReasonCreatePage;
