import React, { useEffect, useState } from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import { BreedHistoryList } from "@/features/breeds";
import { useRouter } from "next/router";
import { NextPageContext } from "next";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";
import { getBreedByIdSSR } from "@/features/breeds/services";
import { Breed } from "@/models";

const BreedHistoryPage = ({ data }: { data: Breed }) => {
  const { breadcrumbs } = useBreadcrumbs();
  const router = useRouter();

  return (
    <>
      <SeoHead title="Breed History" />
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">History</Typography>}
      >
        <BreedHistoryList data={data} />
      </ListLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return getServerSidePropsContext<Breed>({
    context,
    id: Number(id),
    getByIdSSR: getBreedByIdSSR,
  });
}

export default BreedHistoryPage;
