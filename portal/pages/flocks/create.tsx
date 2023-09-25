import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { Breadcrumbs } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { CreateLayout } from "@/layouts";
import {
  FlockForm,
} from "@/features/flocks";
import { SeoHead } from "@/seo";

const FlockCreatePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Create Flock" />
      <CreateLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Create Flock</Typography>}
      >
        <FlockForm />
      </CreateLayout>
    </>
  );
};

export default FlockCreatePage;
