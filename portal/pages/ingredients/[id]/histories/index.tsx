import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import { IngredientHistoryList } from "@/features/ingredients";
import { NextPageContext } from "next";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";
import { getIngredientByIdSSR } from "@/features/ingredients/services";
import { Ingredient } from "@/models";

const IngredientHistoryPage = ({ data }: { data: Ingredient }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Ingredient Histories" />
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Ingredient History</Typography>}
      >
        <IngredientHistoryList data={data} />
      </ListLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return getServerSidePropsContext<Ingredient>({
    context,
    id: Number(id),
    getByIdSSR: getIngredientByIdSSR,
  });
}

export default IngredientHistoryPage;
