import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import { RequirementHistoryList } from "@/features/requirements";
import { NextPageContext } from "next";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";
import { getRequirementByIdSSR } from "@/features/requirements/services";
import { Requirement } from "@/models";

const RequirementHistoryPage = ({ data }: { data: Requirement }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Requirement Histories" />
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Requirement History</Typography>}
      >
        <RequirementHistoryList data={data} />
      </ListLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return getServerSidePropsContext<Requirement>({
    context,
    id: Number(id),
    getByIdSSR: getRequirementByIdSSR,
  });
}

export default RequirementHistoryPage;
