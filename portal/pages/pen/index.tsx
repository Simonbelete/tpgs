import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { PenList } from "@/features/pen";
import { SeoHead } from "@/seo";

const PenPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Pen" />
      <ListLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <PenList />
      </ListLayout>
    </>
  );
};

export default PenPage;
