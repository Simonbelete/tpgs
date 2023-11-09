import React from "react";
import { NextPageContext } from "next";
import { EditLayout } from "@/layouts";
import { IngredientTypeForm } from "@/features/ingredient-types";
import { getIngredientTypeByIdSSR } from "@/features/ingredient-types/services";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { IngredientType } from "@/models";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";

const IngredientTypeEditPage = ({ data }: { data: IngredientType }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title={`${data.display_name || ""} - Edit`} />
      <EditLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <IngredientTypeForm data={data} />
      </EditLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return getServerSidePropsContext<IngredientType>({
    context,
    id: Number(id),
    getByIdSSR: getIngredientTypeByIdSSR,
  });
}

export default IngredientTypeEditPage;
