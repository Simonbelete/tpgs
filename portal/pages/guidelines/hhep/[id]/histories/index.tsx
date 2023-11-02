import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import { HHEPGuidelineHistoryList } from "@/features/hhep-guidelines";
import { NextPageContext } from "next";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";
import { getHHEPGuidelineByIdSSR } from "@/features/hhep-guidelines/services";
import { HHEPGuideline } from "@/models";

const HHEPGuidelineHistoryPage = ({ data }: { data: HHEPGuideline }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="HHEP Guideline Histories" />
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">HHEP Guideline History</Typography>}
      >
        <HHEPGuidelineHistoryList data={data} />
      </ListLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return getServerSidePropsContext<HHEPGuideline>({
    context,
    id: Number(id),
    getByIdSSR: getHHEPGuidelineByIdSSR,
  });
}

export default HHEPGuidelineHistoryPage;
