import React from "react";
import { NextPageContext } from "next";
import { EditLayout } from "@/layouts";
import { IngredientNutrientForm } from "@/features/ingredient-nutrients";
import { getIngredientNutrientByIdSSR } from "@/features/ingredient-nutrients/services";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { IngredientNutrient } from "@/models";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";

const IngredientNutrientEditPage = ({ data }: { data: IngredientNutrient }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title={`${data.display_name || ""} - Edit`} />
      <EditLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <IngredientNutrientForm data={data} />
      </EditLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return getServerSidePropsContext<IngredientNutrient>({
    context,
    id: Number(id),
    getByIdSSR: getIngredientNutrientByIdSSR,
  });
}

export default IngredientNutrientEditPage;
