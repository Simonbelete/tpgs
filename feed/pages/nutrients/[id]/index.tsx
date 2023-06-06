import React from "react";
import { ViewLayout } from "@/components/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Button, Typography, Box, Container } from "@mui/material";
import { NutrientView } from "@/features/nutrients";

const NutrientPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <ViewLayout>
      <Container maxWidth="xl">
        <NutrientView />
      </Container>
    </ViewLayout>
  );
};

export default NutrientPage;
