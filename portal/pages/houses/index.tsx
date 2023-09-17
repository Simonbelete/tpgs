import React, { ChangeEvent, ReactElement } from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography, Stack, Container } from "@mui/material";
import {
  HouseList,
  HouseImportExport,
  HouseFilter,
} from "@/features/houses";
import { SeoHead } from "@/seo";
const HousePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="House"/>
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">House</Typography>}
        actions={<HouseImportExport />}
        filter={<HouseFilter />}
      >
        <HouseList />
      </ListLayout>
    </>
  );
};



export default HousePage;