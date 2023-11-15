import React, { useEffect, useState } from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import { ChickenHistoryList } from "@/features/chickens";
import { useRouter } from "next/router";
import { NextPageContext } from "next";
import { SeoHead } from "@/seo";
import { getChickenByIdSSR } from "@/features/chickens/services";
import { Chicken } from "@/models";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";

const ChickenHistoryPage = ({ data }: { data: Chicken }) => {
  const { breadcrumbs } = useBreadcrumbs();
  const router = useRouter();

  return (
    <>
      <SeoHead title="Chicken Histories" />
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Histories</Typography>}
      >
        <ChickenHistoryList data={data} />
      </ListLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return getServerSidePropsContext<Chicken>({
    context,
    id: Number(id),
    getByIdSSR: getChickenByIdSSR,
  });
}

export default ChickenHistoryPage;
