import React from "react";
import { NextPageContext } from "next";
import { EditLayout } from "@/layouts";
import { IngredientForm } from "@/features/ingredients";
import { getIngredientByIdSSR } from "@/features/ingredients/services";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { Ingredient } from "@/models";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";

const IngredientEditPage = ({ data }: { data: Ingredient }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title={`${data.display_name || ""} - Edit`} />
      <EditLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <IngredientForm data={data} />
      </EditLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return getServerSidePropsContext<Ingredient>({
    context,
    id: Number(id),
    getByIdSSR: getIngredientByIdSSR,
  });
}

export default IngredientEditPage;
