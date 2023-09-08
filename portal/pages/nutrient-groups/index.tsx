import React, { ChangeEvent, ReactElement } from "react";
import { AxiosResponse } from "axios";
import Link from "next/link";
import { ListLayout } from "@/components/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Button, Typography, Stack } from "@mui/material";
import {
  NutrientGroupList,
  nutrientGroupService,
  NutrientGroupImportExport,
  NutrientGroupFilter
} from "@/features/nutrient-group";
import Head from "next/head";
import siteMetadata from "@/data/siteMetadata";

const NutrientGroupPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <Head>
        <title>{siteMetadata.headerTitle} - Nutrient Groups</title>
      </Head>
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Nutrient Groups</Typography>}
        actions={<NutrientGroupImportExport />}
        filter={<NutrientGroupFilter />}
      >
        <NutrientGroupList />
      </ListLayout>
    </>
  );
};

export default NutrientGroupPage;