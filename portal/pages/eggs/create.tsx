import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { Breadcrumbs } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { CreateLayout } from "@/layouts";
import {
  EggForm,
} from "@/features/eggs";
import { SeoHead } from "@/seo";

const EggCreatePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Create Egg Production" />
      <CreateLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Create Egg Production</Typography>}
      >
        <EggForm />
      </CreateLayout>
    </>
  );
};

export default EggCreatePage;
