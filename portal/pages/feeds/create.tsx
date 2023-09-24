import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { Breadcrumbs } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { CreateLayout } from "@/layouts";
import {
  FeedForm,
} from "@/features/feeds";
import { SeoHead } from "@/seo";

const BreedCreatePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Create Feed Intake" />
      <CreateLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Create Feed Intake</Typography>}
      >
        <FeedForm />
      </CreateLayout>
    </>
  );
};

export default BreedCreatePage;
