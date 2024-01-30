import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { FeedGuidelineList } from "@/features/feed-guidelines";
import { SeoHead } from "@/seo";

const FeedGuidelinePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Feed intake guideline" />
      <ListLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <FeedGuidelineList />
      </ListLayout>
    </>
  );
};

export default FeedGuidelinePage;
