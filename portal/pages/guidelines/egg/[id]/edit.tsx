import React from "react";
import { NextPageContext } from "next";
import { EditLayout } from "@/layouts";
import { EggGuidelineForm } from "@/features/egg-guidelines";
import { getEggGuidelineByIdSSR } from "@/features/egg-guidelines/services";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { EggGuideline } from "@/models";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";

const EggGuidelineEditPage = ({ data }: { data: EggGuideline }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title={`${data.display_name || ""} - Edit`} />
      <EditLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <EggGuidelineForm data={data} />
      </EditLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return getServerSidePropsContext<EggGuideline>({
    context,
    id: Number(id),
    getByIdSSR: getEggGuidelineByIdSSR,
  });
}

export default EggGuidelineEditPage;
