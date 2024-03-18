import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { SeoHead } from "@/seo";
import { ActivityList } from "@/features/activity";

const ActivityPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Activities" />
      <ListLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <ActivityList />
      </ListLayout>
    </>
  );
};

export default ActivityPage;
