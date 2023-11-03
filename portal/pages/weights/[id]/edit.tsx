import React from "react";
import { NextPageContext } from "next";
import { EditLayout } from "@/layouts";
import { WeightForm } from "@/features/weights";
import { getWeightByIdSSR } from "@/features/weights/services";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { Weight } from "@/models";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";

const WeightEditPage = ({ data }: { data: Weight }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title={`${data.display_name || ""} - Edit`} />
      <EditLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <WeightForm data={data} />
      </EditLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return getServerSidePropsContext<Weight>({
    context,
    id: Number(id),
    getByIdSSR: getWeightByIdSSR,
  });
}

export default WeightEditPage;
