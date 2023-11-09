import React from "react";
import { NextPageContext } from "next";
import { EditLayout } from "@/layouts";
import { RequirementForm } from "@/features/requirements";
import { getRequirementByIdSSR } from "@/features/requirements/services";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { Requirement } from "@/models";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";

const RequirementEditPage = ({ data }: { data: Requirement }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title={`${data.display_name || ""} - Edit`} />
      <EditLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <RequirementForm data={data} />
      </EditLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return getServerSidePropsContext<Requirement>({
    context,
    id: Number(id),
    getByIdSSR: getRequirementByIdSSR,
  });
}

export default RequirementEditPage;
