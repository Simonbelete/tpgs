import React, { ReactElement, useRef, useImperativeHandle } from "react";
import { Typography, Stack, Button } from "@mui/material";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { ActionLayout } from "@/layouts";
import { Formulation } from "@/features/formula";
import { SeoHead } from "@/seo";

const FormulationExperimentalPage = () => {
  const { breadcrumbs } = useBreadcrumbs();
  const saveRef = useRef();

  return (
    <>
      <SeoHead title="Formulation" />
      <ActionLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Ration Formulation</Typography>}
      >
        <Formulation />
      </ActionLayout>
    </>
  );
};

export default FormulationExperimentalPage;
