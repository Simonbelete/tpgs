import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { Breadcrumbs } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { CreateLayout } from "@/layouts";
import { FeedGuidelineForm } from "@/features/feed-guidelines";
import { SeoHead } from "@/seo";

const FeedGuidelineCreatePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Create feed consumption guideline" />
      <CreateLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <FeedGuidelineForm />
      </CreateLayout>
    </>
  );
};

export default FeedGuidelineCreatePage;
