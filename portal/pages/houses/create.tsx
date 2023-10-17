import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { Breadcrumbs } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { CreateLayout } from "@/layouts";
import { HouseForm } from "@/features/houses";
import { SeoHead } from "@/seo";

const HouseCreatePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Create House" />
      <CreateLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Create House</Typography>}
      >
        <HouseForm redirect />
      </CreateLayout>
    </>
  );
};

export default HouseCreatePage;
