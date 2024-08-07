import React from "react";
import { NextPageContext } from "next";
import { EditLayout } from "@/layouts";
import { EggForm } from "@/features/eggs";
import { getEggByIdSSR } from "@/features/eggs/services";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { Egg } from "@/models";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";

const EggEditPage = ({ data }: { data: Egg }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title={`${data.display_name || ""} - Edit`} />
      <EditLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <EggForm data={data} />
      </EditLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return getServerSidePropsContext<Egg>({
    context,
    id: Number(id),
    getByIdSSR: getEggByIdSSR,
  });
}

export default EggEditPage;
