import React from "react";
import { NextPageContext } from "next";
import { EditLayout } from "@/layouts";
import { FeedForm } from "@/features/feeds";
import { getFeedByIdSSR } from "@/features/feeds/services";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { Feed } from "@/models";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";

const FeedEditPage = ({ data }: { data: Feed }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title={`${data.display_name || ""} - Edit`} />
      <EditLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <FeedForm data={data} />
      </EditLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return getServerSidePropsContext<Feed>({
    context,
    id: Number(id),
    getByIdSSR: getFeedByIdSSR,
  });
}

export default FeedEditPage;
