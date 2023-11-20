import React from "react";
import { NextPageContext } from "next";
import { EditLayout } from "@/layouts";
import { ChickenForm } from "@/features/chickens";
import { getChickenByIdSSR } from "@/features/chickens/services";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { Chicken } from "@/models";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";

const ChickenEditPage = ({ data }: { data: Chicken }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title={`${data.display_name || ""} - Edit`} />
      <EditLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <ChickenForm data={data} />
      </EditLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return getServerSidePropsContext<Chicken>({
    context,
    id: Number(id),
    getByIdSSR: getChickenByIdSSR,
  });
}

export default ChickenEditPage;
