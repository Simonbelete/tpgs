import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { CurrencyList } from "@/features/currencies";
import { SeoHead } from "@/seo";

const CityPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Currency" />
      <ListLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <CurrencyList />
      </ListLayout>
    </>
  );
};

export default CityPage;
