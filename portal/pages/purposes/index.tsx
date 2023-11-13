import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import { PurposeList } from "@/features/purposes";
import { SeoHead } from "@/seo";

const PurposePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Purposes" />
      <ListLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <PurposeList />
      </ListLayout>
    </>
  );
};

export default PurposePage;
