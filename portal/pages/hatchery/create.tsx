import React from "react";
import { Breadcrumbs } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { CreateLayout } from "@/layouts";
import { HatcheryForm } from "@/features/hatchery";
import { SeoHead } from "@/seo";

const HatcheryCreatePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Create Hatchery" />
      <CreateLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <HatcheryForm />
      </CreateLayout>
    </>
  );
};

export default HatcheryCreatePage;
