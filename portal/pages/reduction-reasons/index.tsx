import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import {
  ReductionReasonList,
  ReductionReasonListFilter,
  ReductionReasonImportExport,
} from "@/features/reduction-reason";
import { SeoHead } from "@/seo";

const ReductionReasonsPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Remove" />
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Remove</Typography>}
        actions={<ReductionReasonImportExport />}
        filter={<ReductionReasonListFilter />}
      >
        <ReductionReasonList />
      </ListLayout>
    </>
  );
};

export default ReductionReasonsPage;
