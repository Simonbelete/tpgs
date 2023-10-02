import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { Breadcrumbs } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { CreateLayout } from "@/layouts";
import {
  WeightForm,
} from "@/features/weights";
import { SeoHead } from "@/seo";

const MassWeightCreatePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Create Mass Body Weight" />
      <CreateLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Create Mass Body Weight</Typography>}
      >
        <WeightForm mass />
      </CreateLayout>
    </>
  );
};

export default MassWeightCreatePage;
