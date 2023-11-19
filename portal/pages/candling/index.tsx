import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { CandlingList } from "@/features/hatchery-egg";
import { SeoHead } from "@/seo";

const CandlingPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Candling" />
      <ListLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <CandlingList />
      </ListLayout>
    </>
  );
};

export default CandlingPage;
