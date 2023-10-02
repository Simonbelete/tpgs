import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { Breadcrumbs } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { CreateLayout } from "@/layouts";
import {
  EggForm,
} from "@/features/eggs";
import { SeoHead } from "@/seo";

const MassEggCreatePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Create Mass Egg Production" />
      <CreateLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Create Mass Egg Production</Typography>}
      >
        <EggForm mass />
      </CreateLayout>
    </>
  );
};

export default MassEggCreatePage;
