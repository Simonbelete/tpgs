import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import { EggHistoryList } from "@/features/eggs";
import { NextPageContext } from "next";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";
import { getEggByIdSSR } from "@/features/eggs/services";
import { Egg } from "@/models";

const EggHistoryPage = ({ data }: { data: Egg }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Egg Histories" />
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Egg History</Typography>}
      >
        <EggHistoryList data={data} />
      </ListLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return getServerSidePropsContext<Egg>({
    context,
    id: Number(id),
    getByIdSSR: getEggByIdSSR,
  });
}

export default EggHistoryPage;
