import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { ReductionReasonList } from "@/features/reduction-reason";
import { SeoHead } from "@/seo";

const ReductionReasonsPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Remove" />
      <ListLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <ReductionReasonList />
      </ListLayout>
    </>
  );
};

export default ReductionReasonsPage;
