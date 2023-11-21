import React, { useRef } from "react";
import { NextPageContext } from "next";
import { Tooltip, IconButton, Typography, Stack, Grid } from "@mui/material";
import { StatDashboardLayout } from "@/layouts";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { Requirement } from "@/models";
import { useRouter } from "next/router";
import {
  RequirementStat,
  RequirementComposition,
} from "@/features/requirements";
import { getRequirementByIdSSR } from "@/features/requirements/services";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";

const RequirementDashboardEditPage = ({ data }: { data: Requirement }) => {
  const { breadcrumbs } = useBreadcrumbs();
  const router = useRouter();

  return (
    <StatDashboardLayout
      breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
      header={<Typography variant="title">{data.name}</Typography>}
      actions={<Actions />}
    >
      <Grid container gap={5}>
        <Grid item xs={12}>
          <RequirementStat id={data.id} />
        </Grid>
        <Grid item xs={12}>
          <RequirementComposition id={data.id} />
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

  return getServerSidePropsContext<Requirement>({
    context,
    id: Number(id),
    getByIdSSR: getRequirementByIdSSR,
  });
}

export default RequirementDashboardEditPage;
