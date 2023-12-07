import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import { RequirementIngredientHistoryList } from "@/features/requirement-ingredient";
import { NextPageContext } from "next";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";
import { getRequirementIngredientByIdSSR } from "@/features/requirement-ingredient/services";
import { RequirementIngredient } from "@/models";

const RequirementIngredientHistoryPage = ({
  data,
}: {
  data: RequirementIngredient;
}) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Requirement Min & Max Histories" />
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={
          <Typography variant="title">
            Requirement Ingredient History
          </Typography>
        }
      >
        <RequirementIngredientHistoryList data={data} />
      </ListLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return getServerSidePropsContext<RequirementIngredient>({
    context,
    id: Number(id),
    getByIdSSR: getRequirementIngredientByIdSSR,
  });
}

export default RequirementIngredientHistoryPage;
