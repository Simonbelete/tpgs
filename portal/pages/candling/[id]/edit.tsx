import React from "react";
import { NextPageContext } from "next";
import { EditLayout } from "@/layouts";
import { HatcheryEggForm } from "@/features/hatchery-egg";
import { getHatcheryEggByIdSSR } from "@/features/hatchery-egg/services";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { HatcheryEgg } from "@/models";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";

const PenEditPage = ({ data }: { data: HatcheryEgg }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title={`${data.display_name || ""} - Edit`} />
      <EditLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <HatcheryEggForm data={data} />
      </EditLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return getServerSidePropsContext<HatcheryEgg>({
    context,
    id: Number(id),
    getByIdSSR: getHatcheryEggByIdSSR,
  });
}

export default PenEditPage;
