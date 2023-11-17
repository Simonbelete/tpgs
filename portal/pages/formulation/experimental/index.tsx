import React, { ReactElement, useRef, useImperativeHandle } from "react";
import { Typography, Stack, Button } from "@mui/material";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { ActionLayout } from "@/layouts";
import { Formulation } from "@/features/formula";

const FormulationExperimentalPage = () => {
  const { breadcrumbs } = useBreadcrumbs();
  const saveRef = useRef();

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
