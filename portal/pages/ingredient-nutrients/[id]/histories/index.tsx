import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import { IngredientNutrientHistoryList } from "@/features/ingredient-nutrients";
import { NextPageContext } from "next";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";
import { getIngredientNutrientByIdSSR } from "@/features/ingredient-nutrients/services";
import { IngredientNutrient } from "@/models";

const IngredientNutrientHistoryPage = ({
  data,
}: {
  data: IngredientNutrient;
}) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Ingredient Nutrient Histories" />
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={
          <Typography variant="title">IngredientNutrient History</Typography>
        }
      >
        <IngredientNutrientHistoryList data={data} />
      </ListLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return getServerSidePropsContext<IngredientNutrient>({
    context,
    id: Number(id),
    getByIdSSR: getIngredientNutrientByIdSSR,
  });
}

export default IngredientNutrientHistoryPage;
