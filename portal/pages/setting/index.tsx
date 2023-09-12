import React from "react";
import { EditLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Container, Typography } from "@mui/material";
import { Breadcrumbs, Loading } from "@/components";
import { SettingsForm } from "@/features/settings";
import Head from "next/head";
import siteMetadata from "@/data/siteMetadata";


const SettingPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <Head>
        {siteMetadata.headerTitle} - Setting
      </Head>
      <EditLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Setting</Typography>}
      >
        <SettingsForm />
      </EditLayout>
    </>
  )
}

export default SettingPage;