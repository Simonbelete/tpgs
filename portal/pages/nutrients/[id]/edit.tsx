import React from "react";
import { NextPageContext } from "next";
import { EditLayout } from "@/layouts";
import { NutrientForm } from "@/features/nutrients";
import { getNutrientByIdSSR } from "@/features/nutrients/services";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { Nutrient } from "@/models";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";

const NutrientEditPage = ({ data }: { data: Nutrient }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title={`${data.display_name || ""} - Edit`} />
      <EditLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <NutrientForm data={data} />
      </EditLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return getServerSidePropsContext<Nutrient>({
    context,
    id: Number(id),
    getByIdSSR: getNutrientByIdSSR,
  });
}

export default NutrientEditPage;
