import React, { useEffect, useState } from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import { NutrientHistoryList } from "@/features/nutrients";
import { useRouter } from "next/router";
import { NextPageContext } from "next";
import { SeoHead } from "@/seo";

const NutrientHistoryPage = ({ id }: { id: number }) => {
  const { breadcrumbs } = useBreadcrumbs();
  const router = useRouter();

  return (
    <>
      <SeoHead title="Nutrient Histories" />
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Histories</Typography>}
      >
        <NutrientHistoryList id={id} />
      </ListLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return {
    props: { id },
  };
}

export default NutrientHistoryPage;
