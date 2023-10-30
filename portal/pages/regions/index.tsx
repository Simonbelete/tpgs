import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { RegionList } from "@/features/regions";
import { SeoHead } from "@/seo";

const RegionPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Pen" />
      <ListLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <RegionList />
      </ListLayout>
    </>
  );
};

export default RegionPage;
