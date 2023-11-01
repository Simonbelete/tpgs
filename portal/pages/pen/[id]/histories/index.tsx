import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import { PenHistoryList } from "@/features/pen";
import { NextPageContext } from "next";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";
import { getPenByIdSSR } from "@/features/pen/services";
import { Pen } from "@/models";

const PenHistoryPage = ({ data }: { data: Pen }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Pen Histories" />
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Pen History</Typography>}
      >
        <PenHistoryList data={data} />
      </ListLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return getServerSidePropsContext<Pen>({
    context,
    id: Number(id),
    getByIdSSR: getPenByIdSSR,
  });
}

export default PenHistoryPage;
