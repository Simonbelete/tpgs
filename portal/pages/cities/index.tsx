import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { CityList } from "@/features/cities";
import { SeoHead } from "@/seo";

const CityPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="City" />
      <ListLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <CityList />
      </ListLayout>
    </>
  );
};

export default CityPage;
