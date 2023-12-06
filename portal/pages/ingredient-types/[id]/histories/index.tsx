import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import { IngredientTypeHistoryList } from "@/features/ingredient-types";
import { NextPageContext } from "next";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";
import { getIngredientTypeByIdSSR } from "@/features/ingredient-types/services";
import { IngredientType } from "@/models";

const IngredientTypeHistoryPage = ({ data }: { data: IngredientType }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Ingredient Group Histories" />
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={
          <Typography variant="title">Ingredient Group History</Typography>
        }
      >
        <IngredientTypeHistoryList data={data} />
      </ListLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return getServerSidePropsContext<IngredientType>({
    context,
    id: Number(id),
    getByIdSSR: getIngredientTypeByIdSSR,
  });
}

export default IngredientTypeHistoryPage;
