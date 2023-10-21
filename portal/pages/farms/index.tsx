import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Container, Typography } from "@mui/material";
import { FarmSelect } from "@/features/farms";
import { SeoHead } from "@/seo";

const EggPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Farms" />
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Farms</Typography>}
      >
        <Container maxWidth="sm">
          <FarmSelect />
        </Container>
      </ListLayout>
    </>
  );
};

export default EggPage;
