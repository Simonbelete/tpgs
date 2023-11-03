import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { Breadcrumbs } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { CreateLayout } from "@/layouts";
import { BatchFeedForm } from "@/features/feeds";
import { SeoHead } from "@/seo";

const BreedCreatePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Create Batch Feed Intake" />
      <CreateLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <BatchFeedForm />
      </CreateLayout>
    </>
  );
};

export default BreedCreatePage;
