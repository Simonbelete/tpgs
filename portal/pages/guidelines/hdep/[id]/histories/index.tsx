import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import { HDEPGuidelineHistoryList } from "@/features/hdep-guidelines";
import { NextPageContext } from "next";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";
import { getHDEPGuidelineByIdSSR } from "@/features/hdep-guidelines/services";
import { HDEPGuideline } from "@/models";

const HDEPGuidelineHistoryPage = ({ data }: { data: HDEPGuideline }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="HDEPGuideline Histories" />
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">HDEP Guideline History</Typography>}
      >
        <HDEPGuidelineHistoryList data={data} />
      </ListLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return getServerSidePropsContext<HDEPGuideline>({
    context,
    id: Number(id),
    getByIdSSR: getHDEPGuidelineByIdSSR,
  });
}

export default HDEPGuidelineHistoryPage;
