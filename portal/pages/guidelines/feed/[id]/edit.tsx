import React from "react";
import { NextPageContext } from "next";
import { EditLayout } from "@/layouts";
import { FeedGuidelineForm } from "@/features/feed-guidelines";
import { getFeedGuidelineByIdSSR } from "@/features/feed-guidelines/services";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { FeedGuideline } from "@/models";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";

const FeedGuidelineEditPage = ({ data }: { data: FeedGuideline }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title={`${data.display_name || ""} - Edit`} />
      <EditLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <FeedGuidelineForm data={data} />
      </EditLayout>
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

export default FeedGuidelineEditPage;
