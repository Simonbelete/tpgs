import React from "react";
import { EditLayout } from "@/components/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Container, Typography } from "@mui/material";
import { Breadcrumbs, Loading } from "@/components";
import { SettingsForm } from "@/features/settings";


const SettingPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <EditLayout
      breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
      header={<Typography variant="title">Setting</Typography>}
    >
      <SettingsForm />
    </EditLayout>
  )
}

export default SettingPage;