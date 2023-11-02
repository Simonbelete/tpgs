import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import { FeedGuidelineHistoryList } from "@/features/feed-guidelines";
import { NextPageContext } from "next";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";
import { getFeedGuidelineByIdSSR } from "@/features/feed-guidelines/services";
import { FeedGuideline } from "@/models";

const FeedGuidelineHistoryPage = ({ data }: { data: FeedGuideline }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="FeedGuideline Histories" />
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">FeedGuideline History</Typography>}
      >
        <FeedGuidelineHistoryList data={data} />
      </ListLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return getServerSidePropsContext<FeedGuideline>({
    context,
    id: Number(id),
    getByIdSSR: getFeedGuidelineByIdSSR,
  });
}

export default FeedGuidelineHistoryPage;
