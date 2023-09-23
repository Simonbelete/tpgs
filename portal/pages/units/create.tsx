import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { Breadcrumbs } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { CreateLayout } from "@/layouts";
import {
  UnitForm,
} from "@/features/units";
import { SeoHead } from "@/seo";

const UnitCreatePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Create Unit" />
      <CreateLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Create Unit</Typography>}
      >
        <UnitForm />
      </CreateLayout>
    </>
  );
};

export default UnitCreatePage;
