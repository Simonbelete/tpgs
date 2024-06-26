import React, { useRef } from "react";
import { NextPageContext } from "next";
import {
  Tooltip,
  IconButton,
  Typography,
  Stack,
  Grid,
  Box,
} from "@mui/material";
import { StatDashboardLayout } from "@/layouts";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { Formula } from "@/models";
import { useRouter } from "next/router";
import {
  FormulaAchivementChart,
  IngredientsChart,
  FormulaStat,
  FormulaDashboard,
} from "@/features/formula";
import { getFormulaByIdSSR } from "@/features/formula/services";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";

const FormulaDashboardEditPage = ({ data }: { data: Formula }) => {
  const { breadcrumbs } = useBreadcrumbs();
  const router = useRouter();
  const actionRef = useRef();

  return (
    <StatDashboardLayout
      breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
      header={<Typography variant="title">{data.name}</Typography>}
      actions={<Actions />}
    >
      <FormulaDashboard data={data} />
      {/* <Grid container gap={5}>
        <Grid item xs={12}>
          <FormulaStat id={data.id} />
        </Grid>
        <Grid container item spacing={3} xs={12}>
          <IngredientsChart formula_id={data.id} />
        </Grid>
        <Grid xs={12}>
          <FormulaAchivementChart formula={data} />
        </Grid>
      </Grid> */}
    </StatDashboardLayout>
  );
};

const Actions = () => {
  return (
    <Stack
      spacing={2}
      direction={"row"}
      justifyContent="flex-start"
      alignItems="center"
      useFlexGap
      flexWrap="wrap"
    >
      <Tooltip title="Edit">
        <IconButton color="secondary">
          <EditNoteIcon />
        </IconButton>
      </Tooltip>
    </Stack>
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

export default FormulaDashboardEditPage;
