import React from "react";
import { EditLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Stack, Button, Typography, IconButton, Tooltip } from "@mui/material";
import { Breadcrumbs, Loading } from "@/components";
import { SettingsForm } from "@/features/settings";
import Head from "next/head";
import siteMetadata from "@/data/siteMetadata";
import Link from "next/link";
import LogoutIcon from "@mui/icons-material/Logout";
import CancelIcon from "@mui/icons-material/Cancel";
import { SeoHead } from "@/seo";

const SettingPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Setting" />
      <EditLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Setting</Typography>}
        actions={<Actions />}
      >
        <SettingsForm />
      </EditLayout>
    </>
  );
};

const Actions = () => {
  return (
    <Stack
      spacing={0}
      direction={"row"}
      justifyContent="flex-start"
      alignItems="center"
    >
      <Link href="/api/logout">
        <Tooltip title="Logout">
          <IconButton>
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </Link>
      <Tooltip title="Cancel">
        <Link href="/dashboard">
          <IconButton color="secondary">
            <CancelIcon />
          </IconButton>
        </Link>
      </Tooltip>
    </Stack>
  );
};

export default SettingPage;
