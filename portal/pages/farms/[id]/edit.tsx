import React from "react";
import { NextPageContext } from "next";
import { EditLayout } from "@/layouts";
import { getFarmByIdSSR } from "@/features/farms/services";
import { Breadcrumbs } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { Farm } from "@/models";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";
import { FarmForm } from "@/features/farms";

const FarmEditPage = ({ data }: { data: Farm }) => {
  const { breadcrumbs } = useBreadcrumbs();

  console.log(data);
  return (
    <>
      <SeoHead title={`${data.display_name || ""} - Edit`} />
      <EditLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <FarmForm data={data} />
      </EditLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return getServerSidePropsContext<Farm>({
    context,
    id: Number(id),
    getByIdSSR: getFarmByIdSSR,
  });
}

export default FarmEditPage;
