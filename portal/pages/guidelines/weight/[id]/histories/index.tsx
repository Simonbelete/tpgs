import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import { WeightGuidelineHistoryList } from "@/features/weight-guidelines";
import { NextPageContext } from "next";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";
import { getWeightGuidelineByIdSSR } from "@/features/weight-guidelines/services";
import { WeightGuideline } from "@/models";

const WeightGuidelineHistoryPage = ({ data }: { data: WeightGuideline }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="WeightGuideline Histories" />
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={
          <Typography variant="title">WeightGuideline History</Typography>
        }
      >
        <WeightGuidelineHistoryList data={data} />
      </ListLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return getServerSidePropsContext<WeightGuideline>({
    context,
    id: Number(id),
    getByIdSSR: getWeightGuidelineByIdSSR,
  });
}

export default WeightGuidelineHistoryPage;
