import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import { HouseList } from "@/features/houses";
import { SeoHead } from "@/seo";

const HousePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="House" />
      <ListLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <HouseList />
      </ListLayout>
    </>
  );
};

export default HousePage;
