import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import { BreedList } from "@/features/breeds";
import { SeoHead } from "@/seo";

const BreedPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Breeds" />
      <ListLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <BreedList />
      </ListLayout>
    </>
  );
};

export default BreedPage;
