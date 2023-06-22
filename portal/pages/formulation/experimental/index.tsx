import React, { ReactElement } from "react";
import { Typography } from "@mui/material";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { ActionLayout } from "@/components/layouts";
import { Formulation } from "@/features/formula";

const FormulationExperimentalPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <ActionLayout
      breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
      header={<Typography variant="title">Formulate</Typography>}
    >
      <Formulation />
    </ActionLayout>
  );
};

export default FormulationExperimentalPage;
