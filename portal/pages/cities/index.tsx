import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import {
  CityList,
  CityListFilter
} from "@/features/cities";
import { SeoHead } from "@/seo";

const CityPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="City"/>
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">City</Typography>}
        filter={<CityListFilter />}
      >
        <CityList />
      </ListLayout>
    </>
  );
};



export default CityPage;