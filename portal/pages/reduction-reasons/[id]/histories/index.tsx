import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import { ReductionReasonHistoryList } from "@/features/reduction-reason";
import { NextPageContext } from "next";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";
import { getReductionReasonByIdSSR } from "@/features/reduction-reason/services";
import { ReductionReason } from "@/models";

const ReductionReasonHistoryPage = ({ data }: { data: ReductionReason }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Reduction Reason Histories" />
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={
          <Typography variant="title">Reduction Reason History</Typography>
        }
      >
        <ReductionReasonHistoryList data={data} />
      </ListLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return getServerSidePropsContext<ReductionReason>({
    context,
    id: Number(id),
    getByIdSSR: getReductionReasonByIdSSR,
  });
}

export default ReductionReasonHistoryPage;
