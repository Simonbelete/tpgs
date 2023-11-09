import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import { RequirementNutrientHistoryList } from "@/features/requirement-nutrients";
import { NextPageContext } from "next";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";
import { getRequirementNutrientByIdSSR } from "@/features/requirement-nutrients/services";
import { RequirementNutrient } from "@/models";

const RequirementNutrientHistoryPage = ({
  data,
}: {
  data: RequirementNutrient;
}) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="RequirementNutrient Histories" />
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={
          <Typography variant="title">Requirement Nutrient History</Typography>
        }
      >
        <RequirementNutrientHistoryList data={data} />
      </ListLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return getServerSidePropsContext<RequirementNutrient>({
    context,
    id: Number(id),
    getByIdSSR: getRequirementNutrientByIdSSR,
  });
}

export default RequirementNutrientHistoryPage;
