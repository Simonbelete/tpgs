import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import {
  FeedList,
  FeedListFilter,
  MassFeedImportExport,
} from "@/features/feeds";
import { SeoHead } from "@/seo";

const MassFeedPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Batch Feed Intake" />
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Batch Feed Intake</Typography>}
        actions={<MassFeedImportExport />}
        filter={<FeedListFilter />}
      >
        <FeedList mass />
      </ListLayout>
    </>
  );
};

export default MassFeedPage;
