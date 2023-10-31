import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { CountryList } from "@/features/countries";
import { SeoHead } from "@/seo";

const CountryPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Countries" />
      <ListLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <CountryList />
      </ListLayout>
    </>
  );
};

export default CountryPage;
