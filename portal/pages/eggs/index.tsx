import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { EggList } from "@/features/eggs";
import { SeoHead } from "@/seo";

const EggPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Egg Production" />
      <ListLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <EggList />
      </ListLayout>
    </>
  );
};

export default EggPage;
