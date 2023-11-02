import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { WeightGuidelineList } from "@/features/weight-guidelines";
import { SeoHead } from "@/seo";

const WeightGuidelinePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Body weight guideline" />
      <ListLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <WeightGuidelineList />
      </ListLayout>
    </>
  );
};

export default WeightGuidelinePage;
