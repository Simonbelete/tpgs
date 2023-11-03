import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import { FeedList } from "@/features/feeds";
import { SeoHead } from "@/seo";

const FeedPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Individual Feed Intake" />
      <ListLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <FeedList />
      </ListLayout>
    </>
  );
};

export default FeedPage;
