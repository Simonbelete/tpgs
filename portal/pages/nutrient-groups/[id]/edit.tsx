import React from "react";
import { NextPageContext } from "next";
import { EditLayout } from "@/layouts";
import { NutrientGroupForm } from "@/features/nutrient-group";
import { getNutrientGroupByIdSSR } from "@/features/nutrient-group/services";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { NutrientGroup } from "@/models";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";

const NutrientGroupEditPage = ({ data }: { data: NutrientGroup }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title={`${data.display_name || ""} - Edit`} />
      <EditLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <NutrientGroupForm data={data} />
      </EditLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return getServerSidePropsContext<NutrientGroup>({
    context,
    id: Number(id),
    getByIdSSR: getNutrientGroupByIdSSR,
  });
}

export default NutrientGroupEditPage;
