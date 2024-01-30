import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { HDEPGuidelineList } from "@/features/hdep-guidelines";
import { SeoHead } from "@/seo";

const HDEPGuidelinePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="HDEP Guideline" />
      <ListLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <HDEPGuidelineList />
      </ListLayout>
    </>
  );
};

export default HDEPGuidelinePage;
