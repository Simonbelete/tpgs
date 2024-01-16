import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { Breadcrumbs } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { CreateLayout } from "@/layouts";
import { CullChickenForm } from "@/features/chickens";
import { SeoHead } from "@/seo";

const CullChickenPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Cull Chicken" />
      <CreateLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <CullChickenForm />
      </CreateLayout>
    </>
  );
};

export default CullChickenPage;
