import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { HatcheryList } from "@/features/hatchery";
import { SeoHead } from "@/seo";

const HatcheryPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Hatchery" />
      <ListLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <HatcheryList />
      </ListLayout>
    </>
  );
};

export default HatcheryPage;
