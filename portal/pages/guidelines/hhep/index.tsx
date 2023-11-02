import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { HHEPGuidelineList } from "@/features/hhep-guidelines";
import { SeoHead } from "@/seo";

const HHEPGuidelinePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Body HHEP guideline" />
      <ListLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <HHEPGuidelineList />
      </ListLayout>
    </>
  );
};

export default HHEPGuidelinePage;
