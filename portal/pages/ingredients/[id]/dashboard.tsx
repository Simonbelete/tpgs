import React, { useRef } from "react";
import { NextPageContext } from "next";
import { Tooltip, IconButton, Typography, Stack, Grid } from "@mui/material";
import { StatDashboardLayout } from "@/layouts";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { Formula } from "@/models";
import { useRouter } from "next/router";
import { IngredientStat, IngredientComposition } from "@/features/ingredients";
import { getFormulaByIdSSR } from "@/features/formula/services";
import EditNoteIcon from "@mui/icons-material/EditNote";

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
      <Grid container gap={5}>
        <Grid item xs={12}>
          <IngredientStat id={data.id} />
        </Grid>
        <Grid item xs={12}>
          <IngredientComposition id={data.id} />
        </Grid>
      </Grid>
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

  try {
    const res = await getFormulaByIdSSR(context, Number(id));

    if (res.status != 200)
      return {
        redirect: {
          permanent: false,
          destination: `/${res.status}?id=${id}&from=/formulation/formulas&next=/formulation/formulas`,
        },
      };

    const data = res.data;

    return { props: { data } };
  } catch (ex) {
    return {
      redirect: {
        permanent: false,
        destination: `/404?id=${id}&from=/formulation/formulas&next=/formulation/formulas&error=unknown`,
      },
    };
  }
}

export default FormulaDashboardEditPage;
