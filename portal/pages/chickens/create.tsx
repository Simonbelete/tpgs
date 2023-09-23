import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { Breadcrumbs } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { CreateLayout } from "@/layouts";
import {
  ChickenForm,
} from "@/features/chickens";
import { SeoHead } from "@/seo";

const ChickenCreatePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Create Chicken" />
      <CreateLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Create Chicken</Typography>}
      >
        <ChickenForm />
      </CreateLayout>
    </>
  );
};

export default ChickenCreatePage;
