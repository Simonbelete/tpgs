import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { StageList } from "@/features/stage";
import { SeoHead } from "@/seo";

const StagePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Stages" />
      <ListLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <StageList />
      </ListLayout>
    </>
  );
};

export default StagePage;
