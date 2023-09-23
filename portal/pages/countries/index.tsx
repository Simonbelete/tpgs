import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import {
  CountryList,
  CountryListFilter
} from "@/features/countries";
import { SeoHead } from "@/seo";

const CountryPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Countries"/>
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Countries</Typography>}
        filter={<CountryListFilter />}
      >
        <CountryList />
      </ListLayout>
    </>
  );
};



export default CountryPage;