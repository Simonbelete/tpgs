import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import { IncubationHistoryList } from "@/features/incubation";
import { NextPageContext } from "next";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";
import { getIncubationByIdSSR } from "@/features/incubation/services";
import { Incubation } from "@/models";

const IncubationHistoryPage = ({ data }: { data: Incubation }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Incubation Histories" />
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Incubation History</Typography>}
      >
        <IncubationHistoryList data={data} />
      </ListLayout>
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

export default IncubationHistoryPage;
