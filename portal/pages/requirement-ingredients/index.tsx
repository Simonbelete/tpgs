import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { RequirementIngredientList } from "@/features/requirement-ingredient";
import { SeoHead } from "@/seo";

const RequirementIngredientsPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Requirement Min & Max" />
      <ListLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <RequirementIngredientList />
      </ListLayout>
    </>
  );
};

export default RequirementIngredientsPage;
