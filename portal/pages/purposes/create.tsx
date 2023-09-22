import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { Breadcrumbs } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { CreateLayout } from "@/layouts";
import {
  PurposeForm,
} from "@/features/purposes";
import { SeoHead } from "@/seo";

const PurposeCreatePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Create Purpose" />
      <CreateLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Create Purpose</Typography>}
      >
        <PurposeForm />
      </CreateLayout>
    </>
  );
};

export default PurposeCreatePage;
