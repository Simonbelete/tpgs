import React from "react";
import { Breadcrumbs } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { CreateLayout } from "@/layouts";
import { HouseForm } from "@/features/houses";
import { SeoHead } from "@/seo";

const HouseCreatePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Create House" />
      <CreateLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <HouseForm />
      </CreateLayout>
    </>
  );
};

export default HouseCreatePage;
