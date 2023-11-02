import React from "react";
import { NextPageContext } from "next";
import { EditLayout } from "@/layouts";
import { HDEPGuidelineForm } from "@/features/hdep-guidelines";
import { getHDEPGuidelineByIdSSR } from "@/features/hdep-guidelines/services";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { HDEPGuideline } from "@/models";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";

const HDEPGuidelineEditPage = ({ data }: { data: HDEPGuideline }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title={`${data.display_name || ""} - Edit`} />
      <EditLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <HDEPGuidelineForm data={data} />
      </EditLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return getServerSidePropsContext<HDEPGuideline>({
    context,
    id: Number(id),
    getByIdSSR: getHDEPGuidelineByIdSSR,
  });
}

export default HDEPGuidelineEditPage;
