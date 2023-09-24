import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import {
  FeedList,
  FeedListFilter,
  FeedImportExport,
} from "@/features/feeds";
import { SeoHead } from "@/seo";

const FeedPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Individual Feed Intake"/>
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Individual Feed Intake</Typography>}
        actions={<FeedImportExport />}
        filter={<FeedListFilter />}
      >
        <FeedList />
      </ListLayout>
    </>
  );
};



export default FeedPage;