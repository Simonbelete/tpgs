import React from "react";
import { NextPageContext } from "next";
import { EditLayout } from "@/layouts";
import { HouseForm } from "@/features/houses";
import { getHouseByIdSSR } from "@/features/houses/services";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { House } from "@/models";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";

const HouseEditPage = ({ data }: { data: House }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title={`${data.display_name || ""} - Edit`} />
      <EditLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <HouseForm data={data} />
      </EditLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return getServerSidePropsContext<House>({
    context,
    id: Number(id),
    getByIdSSR: getHouseByIdSSR,
  });
}

export default HouseEditPage;
