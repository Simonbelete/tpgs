import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import { EggGuidelineHistoryList } from "@/features/egg-guidelines";
import { NextPageContext } from "next";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";
import { getEggGuidelineByIdSSR } from "@/features/egg-guidelines/services";
import { EggGuideline } from "@/models";

const EggGuidelineHistoryPage = ({ data }: { data: EggGuideline }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="EggGuideline Histories" />
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">EggGuideline History</Typography>}
      >
        <EggGuidelineHistoryList data={data} />
      </ListLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return getServerSidePropsContext<EggGuideline>({
    context,
    id: Number(id),
    getByIdSSR: getEggGuidelineByIdSSR,
  });
}

export default EggGuidelineHistoryPage;
