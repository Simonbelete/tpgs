import React from "react";
import { NextPageContext } from "next";
import { EditLayout } from "@/layouts";
import { UnitForm } from "@/features/units";
import { getUnitByIdSSR } from "@/features/units/services";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { Unit } from "@/models";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";

const UnitEditPage = ({ data }: { data: Unit }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title={`${data.display_name || ""} - Edit`} />
      <EditLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <UnitForm data={data} />
      </EditLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return getServerSidePropsContext<Unit>({
    context,
    id: Number(id),
    getByIdSSR: getUnitByIdSSR,
  });
}

export default UnitEditPage;
