import React, { useEffect } from "react";
import { Typography } from "@mui/material";
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
      <CreateLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Create Hatchery</Typography>}
      >
        <HatcheryForm />
      </CreateLayout>
    </>
  );
};

export default HatcheryCreatePage;
