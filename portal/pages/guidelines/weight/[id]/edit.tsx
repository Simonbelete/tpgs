import React from "react";
import { NextPageContext } from "next";
import { EditLayout } from "@/layouts";
import { WeightGuidelineForm } from "@/features/weight-guidelines";
import { getWeightGuidelineByIdSSR } from "@/features/weight-guidelines/services";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { WeightGuideline } from "@/models";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";

const WeightGuidelineEditPage = ({ data }: { data: WeightGuideline }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title={`${data.display_name || ""} - Edit`} />
      <EditLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <WeightGuidelineForm data={data} />
      </EditLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return getServerSidePropsContext<WeightGuideline>({
    context,
    id: Number(id),
    getByIdSSR: getWeightGuidelineByIdSSR,
  });
}

export default WeightGuidelineEditPage;
