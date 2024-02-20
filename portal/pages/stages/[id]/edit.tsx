import React from "react";
import { NextPageContext } from "next";
import { EditLayout } from "@/layouts";
import { StageForm } from "@/features/stage";
import { getStageByIdSSR } from "@/features/stage/services";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { Stage } from "@/models";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";

const StageEditPage = ({ data }: { data: Stage }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title={`${data.display_name || ""} - Edit`} />
      <EditLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <StageForm data={data} />
      </EditLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return getServerSidePropsContext<Stage>({
    context,
    id: Number(id),
    getByIdSSR: getStageByIdSSR,
  });
}

export default StageEditPage;
