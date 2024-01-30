import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { EggGuidelineList } from "@/features/egg-guidelines";
import { SeoHead } from "@/seo";

const EggGuidelinePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Egg production guideline" />
      <ListLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <EggGuidelineList />
      </ListLayout>
    </>
  );
};

export default EggGuidelinePage;
