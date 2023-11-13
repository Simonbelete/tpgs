import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import { PurposeHistoryList } from "@/features/purposes";
import { NextPageContext } from "next";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";
import { getPurposeByIdSSR } from "@/features/purposes/services";
import { Purpose } from "@/models";

const PurposeHistoryPage = ({ data }: { data: Purpose }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Purpose Histories" />
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Purpose History</Typography>}
      >
        <PurposeHistoryList data={data} />
      </ListLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return getServerSidePropsContext<Purpose>({
    context,
    id: Number(id),
    getByIdSSR: getPurposeByIdSSR,
  });
}

export default PurposeHistoryPage;
