import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { RequirementNutrientList } from "@/features/requirement-nutrients";
import { SeoHead } from "@/seo";

const RequirementNutrientsPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Requirement Nutrients" />
      <ListLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <RequirementNutrientList />
      </ListLayout>
    </>
  );
};

export default RequirementNutrientsPage;
