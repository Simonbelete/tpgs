import React from "react";
import { NextPageContext } from "next";
import { EditLayout } from "@/layouts";
import { HatcheryForm } from "@/features/hatchery";
import { getHatcheryByIdSSR } from "@/features/hatchery/services";
import { Breadcrumbs } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { Hatchery } from "@/models";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";

const HatcheryEditPage = ({ data }: { data: Hatchery }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title={`${data.name || ""} - Edit`} />
      <EditLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <HatcheryForm data={data} />
      </EditLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return getServerSidePropsContext<Hatchery>({
    context,
    id: Number(id),
    getByIdSSR: getHatcheryByIdSSR,
  });
}

export default HatcheryEditPage;
