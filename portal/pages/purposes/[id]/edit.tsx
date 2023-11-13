import React from "react";
import { NextPageContext } from "next";
import { EditLayout } from "@/layouts";
import { PurposeForm } from "@/features/purposes";
import { getPurposeByIdSSR } from "@/features/purposes/services";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { Purpose } from "@/models";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";

const PurposeEditPage = ({ data }: { data: Purpose }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title={`${data.display_name || ""} - Edit`} />
      <EditLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <PurposeForm data={data} />
      </EditLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return getServerSidePropsContext<Purpose>({
    context,
    id: Number(id),
    getByIdSSR: getPurposeByIdSSR,
  });
}

export default PurposeEditPage;
