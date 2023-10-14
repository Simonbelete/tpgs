import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import {
  FlockAccusationList,
  FlockAccusationListFilter,
  FlockImportExport,
} from "@/features/flocks";
import { SeoHead } from "@/seo";

const FlockAccusationPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Flock Accusations" />
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Flock Accusations</Typography>}
        actions={<FlockImportExport />}
        filter={<FlockAccusationListFilter />}
      >
        <>a</>
      </ListLayout>
    </>
  );
};

export default FlockAccusationPage;
