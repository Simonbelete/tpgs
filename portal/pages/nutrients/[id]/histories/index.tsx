import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import { NutrientHistoryList } from "@/features/nutrients";
import { NextPageContext } from "next";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";
import { getNutrientByIdSSR } from "@/features/nutrients/services";
import { Nutrient } from "@/models";

const NutrientHistoryPage = ({ data }: { data: Nutrient }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Nutrient Histories" />
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Nutrient History</Typography>}
      >
        <NutrientHistoryList data={data} />
      </ListLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return getServerSidePropsContext<Nutrient>({
    context,
    id: Number(id),
    getByIdSSR: getNutrientByIdSSR,
  });
}

export default NutrientHistoryPage;
