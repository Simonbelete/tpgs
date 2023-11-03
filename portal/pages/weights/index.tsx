import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { WeightList } from "@/features/weights";
import { SeoHead } from "@/seo";

const WeightPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Body Weight" />
      <ListLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <WeightList />
      </ListLayout>
    </>
  );
};

export default WeightPage;
