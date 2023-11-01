import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import { IncubationList } from "@/features/incubation";
import { SeoHead } from "@/seo";

const IncubationPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Incubation" />
      <ListLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <IncubationList />
      </ListLayout>
    </>
  );
};

export default IncubationPage;
