import React, { useEffect } from "react";
import { Breadcrumbs } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { CreateLayout } from "@/layouts";
import { WeightForm } from "@/features/weights";
import { SeoHead } from "@/seo";

const WeightCreatePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Create Body Weight" />
      <CreateLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <WeightForm />
      </CreateLayout>
    </>
  );
};

export default WeightCreatePage;
