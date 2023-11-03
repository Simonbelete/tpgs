import React from "react";
import { NextPageContext } from "next";
import { EditLayout } from "@/layouts";
import { BreedForm } from "@/features/breeds";
import { getBreedByIdSSR } from "@/features/breeds/services";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { Breed } from "@/models";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";

const BreeedEditPage = ({ data }: { data: Breed }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title={`${data.name || ""} - Edit`} />
      <EditLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <BreedForm data={data} />
      </EditLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return getServerSidePropsContext<Breed>({
    context,
    id: Number(id),
    getByIdSSR: getBreedByIdSSR,
  });
}

export default BreeedEditPage;
