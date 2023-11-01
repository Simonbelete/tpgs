import React from "react";
import { NextPageContext } from "next";
import { EditLayout } from "@/layouts";
import { PenForm } from "@/features/pen";
import { getPenByIdSSR } from "@/features/pen/services";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { Pen } from "@/models";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";

const PenEditPage = ({ data }: { data: Pen }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title={`${data.name || ""} - Edit`} />
      <EditLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <PenForm data={data} />
      </EditLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return getServerSidePropsContext<Pen>({
    context,
    id: Number(id),
    getByIdSSR: getPenByIdSSR,
  });
}

export default PenEditPage;
