import React, { useEffect, useState } from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import { NutrientGroupHistoryList } from "@/features/nutrient-group";
import { useRouter } from "next/router";
import { NextPageContext } from "next";

const NutrientGroupHistoryPage = ({ id }: { id: number }) => {
  const { breadcrumbs } = useBreadcrumbs();
  const router = useRouter();

  return (
    <ListLayout
      breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
      header={<Typography variant="title">Nutrients Group</Typography>}
      actions={<Actions />}
    >
      <NutrientGroupHistoryList id={id} />
    </ListLayout>
  );
};

const Actions = () => {
  return <></>;
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  console.log(context.query);

  return {
    props: { id },
  };
}

export default NutrientGroupHistoryPage;
