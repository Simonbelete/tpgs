import React from "react";
import { Typography } from "@mui/material";
import { ReportingLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { SeoHead } from "@/seo";
import { Breadcrumbs } from "@/components";
import { Container } from "@mui/material";

const HHEPPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="HHEP" />
      <ReportingLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={
          <Typography variant="title">Hen Housed Egg Production</Typography>
        }
      >
        <Container maxWidth="lg"></Container>
      </ReportingLayout>
    </>
  );
};

export default HHEPPage;
