import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import { WeightHistoryList } from "@/features/weights";
import { NextPageContext } from "next";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";
import { getWeightByIdSSR } from "@/features/weights/services";
import { Weight } from "@/models";

const WeightHistoryPage = ({ data }: { data: Weight }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Weight Histories" />
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Weight History</Typography>}
      >
        <WeightHistoryList data={data} />
      </ListLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return getServerSidePropsContext<Weight>({
    context,
    id: Number(id),
    getByIdSSR: getWeightByIdSSR,
  });
}

export default WeightHistoryPage;
