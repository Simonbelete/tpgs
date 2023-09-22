import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { Breadcrumbs } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { CreateLayout } from "@/layouts";
import {
  BreedForm,
} from "@/features/breeds";
import { SeoHead } from "@/seo";

const BreedCreatePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Create Breed" />
      <CreateLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Create Breed</Typography>}
      >
        <BreedForm />
      </CreateLayout>
    </>
  );
};

export default BreedCreatePage;
