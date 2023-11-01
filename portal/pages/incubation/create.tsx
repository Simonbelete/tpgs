import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { Breadcrumbs } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { CreateLayout } from "@/layouts";
import { IncubationForm } from "@/features/incubation";
import { SeoHead } from "@/seo";

const IncubationCreatePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Create Incubation" />
      <CreateLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <IncubationForm />
      </CreateLayout>
    </>
  );
};

export default IncubationCreatePage;
