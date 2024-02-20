import React, { useEffect } from "react";
import { Breadcrumbs } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { CreateLayout } from "@/layouts";
import { SeoHead } from "@/seo";
import { SelectionForm } from "@/features/selection";
import { Container, Grid, Box, Typography } from "@mui/material";

const PenCreatePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Selection" />
      <CreateLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <Grid>
          <Box sx={{ display: "flex" }} justifyContent={"start"}>
            <Typography variant="title">Selection Process</Typography>
          </Box>
          <Container maxWidth="lg" sx={{ mt: 5 }}>
            <SelectionForm />
          </Container>
        </Grid>
      </CreateLayout>
    </>
  );
};

export default PenCreatePage;
