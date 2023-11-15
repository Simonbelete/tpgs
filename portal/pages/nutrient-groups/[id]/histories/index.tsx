import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import { NutrientGroupHistoryList } from "@/features/nutrient-group";
import { NextPageContext } from "next";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";
import { getNutrientGroupByIdSSR } from "@/features/nutrient-group/services";
import { NutrientGroup } from "@/models";

const NutrientGroupHistoryPage = ({ data }: { data: NutrientGroup }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Nutrient Group Histories" />
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">NutrientGroup History</Typography>}
      >
        <NutrientGroupHistoryList data={data} />
      </ListLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return getServerSidePropsContext<NutrientGroup>({
    context,
    id: Number(id),
    getByIdSSR: getNutrientGroupByIdSSR,
  });
}

export default NutrientGroupHistoryPage;
