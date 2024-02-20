import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import { StageHistoryList } from "@/features/stage";
import { NextPageContext } from "next";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";
import { getStageByIdSSR } from "@/features/stage/services";
import { Stage } from "@/models";

const StageHistoryPage = ({ data }: { data: Stage }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Stage Histories" />
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Stage History</Typography>}
      >
        <StageHistoryList data={data} />
      </ListLayout>
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

export default StageHistoryPage;
