import React from "react";
import { NextPageContext } from "next";
import { EditLayout } from "@/layouts";
import { RequirementNutrientForm } from "@/features/requirement-nutrients";
import { getRequirementNutrientByIdSSR } from "@/features/requirement-nutrients/services";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { RequirementNutrient } from "@/models";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";

const RequirementNutrientEditPage = ({
  data,
}: {
  data: RequirementNutrient;
}) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title={`${data.display_name || ""} - Edit`} />
      <EditLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <RequirementNutrientForm data={data} />
      </EditLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return getServerSidePropsContext<RequirementNutrient>({
    context,
    id: Number(id),
    getByIdSSR: getRequirementNutrientByIdSSR,
  });
}

export default RequirementNutrientEditPage;
