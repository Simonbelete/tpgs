import React from "react";
import { ListLayout } from "@/components/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import { NutrientGroupHistoryList } from "@/features/nutrient-group";
import { useRouter } from "next/router";

const NutrientGroupHistoryPage = () => {
  const { breadcrumbs } = useBreadcrumbs();
  const router = useRouter();

  return (
    <ListLayout
      breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
      header={<Typography variant="title">Nutrients Group</Typography>}
      actions={<Actions />}
    >
      <NutrientGroupHistoryList id={Number(router.query.id)} />
    </ListLayout>
  );
};

const Actions = () => {
  return <></>;
};

export default NutrientGroupHistoryPage;
