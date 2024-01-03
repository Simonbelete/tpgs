import React from "react";
import { NextPageContext } from "next";
import { Typography } from "@mui/material";
import { EditLayout } from "@/layouts";
import { getIncubationByIdSSR } from "@/features/incubation/services";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { Incubation } from "@/models";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";
import { IncubationForm } from "@/features/incubation";

const InclubationEditPage = ({ data }: { data: Incubation }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title={`${data.display_name || ""} - Edit`} />
      <EditLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <IncubationForm data={data} />
      </EditLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return getServerSidePropsContext<Incubation>({
    context,
    id: Number(id),
    getByIdSSR: getIncubationByIdSSR,
  });
}

export default InclubationEditPage;
