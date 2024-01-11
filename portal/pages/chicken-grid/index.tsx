import React, { ReactElement, useRef, useImperativeHandle } from "react";
import { Typography, Stack, Button } from "@mui/material";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { ActionLayout } from "@/layouts";
import { GridChickenInput } from "@/features/chickens/chicken-grid";
import { SeoHead } from "@/seo";

const Page = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Chicken Grid" />
      <ActionLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Grid</Typography>}
      >
        <GridChickenInput />
      </ActionLayout>
    </>
  );
};

export default Page;
