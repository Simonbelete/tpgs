import React, { useEffect, useState } from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import { HouseHistoryList } from "@/features/houses";
import { useRouter } from "next/router";
import { NextPageContext } from "next";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";
import { getHouseByIdSSR } from "@/features/houses/services";
import { House } from "@/models";

const HouseHistoryPage = ({ data }: { data: House }) => {
  const { breadcrumbs } = useBreadcrumbs();
  const router = useRouter();

  return (
    <>
      <SeoHead title="House Histories" />
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">House History</Typography>}
      >
        <HouseHistoryList data={data} />
      </ListLayout>
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

export default HouseHistoryPage;
