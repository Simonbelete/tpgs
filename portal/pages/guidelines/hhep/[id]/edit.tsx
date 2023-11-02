import React from "react";
import { NextPageContext } from "next";
import { EditLayout } from "@/layouts";
import { HHEPGuidelineForm } from "@/features/hhep-guidelines";
import { getHHEPGuidelineByIdSSR } from "@/features/hhep-guidelines/services";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { HHEPGuideline } from "@/models";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";

const HHEPGuidelineEditPage = ({ data }: { data: HHEPGuideline }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title={`${data.display_name || ""} - Edit`} />
      <EditLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <HHEPGuidelineForm data={data} />
      </EditLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return getServerSidePropsContext<HHEPGuideline>({
    context,
    id: Number(id),
    getByIdSSR: getHHEPGuidelineByIdSSR,
  });
}

export default HHEPGuidelineEditPage;
