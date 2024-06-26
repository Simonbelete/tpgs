import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { NutrientGroupList } from "@/features/nutrient-group";
import { SeoHead } from "@/seo";

const NutrientGroupPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Nutrient Group" />
      <ListLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <NutrientGroupList />
      </ListLayout>
    </>
  );
};

export default NutrientGroupPage;
