import React from "react";
import { NextPageContext } from "next";
import { EditLayout } from "@/layouts";
import { RequirementIngredientForm } from "@/features/requirement-ingredient";
import { getRequirementIngredientByIdSSR } from "@/features/requirement-ingredient/services";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { RequirementIngredient } from "@/models";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";

const RequirementIngredientEditPage = ({
  data,
}: {
  data: RequirementIngredient;
}) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title={`${data.display_name || ""} - Edit`} />
      <EditLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <RequirementIngredientForm data={data} />
      </EditLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return getServerSidePropsContext<RequirementIngredient>({
    context,
    id: Number(id),
    getByIdSSR: getRequirementIngredientByIdSSR,
  });
}

export default RequirementIngredientEditPage;
