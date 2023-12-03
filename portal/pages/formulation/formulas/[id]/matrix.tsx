import React, { ReactElement, useRef, useImperativeHandle } from "react";
import { Typography, Stack, Button } from "@mui/material";
import { Breadcrumbs } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { ActionLayout } from "@/layouts";
import { Formulation } from "@/features/formula";
import { Formula } from "@/models";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";
import { getFormulaByIdSSR } from "@/features/formula/services";
import { NextPageContext } from "next";

const FormulationExperimentalPage = ({ data }: { data: Formula }) => {
  const { breadcrumbs } = useBreadcrumbs();
  const saveRef = useRef();

  return (
    <ActionLayout
      breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
      header={
        <Typography variant="title">{data.name || "Formulate"}</Typography>
      }
    >
      <Formulation data={data} />
    </ActionLayout>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return getServerSidePropsContext<Formula>({
    context,
    id: Number(id),
    getByIdSSR: getFormulaByIdSSR,
  });
}

export default FormulationExperimentalPage;
