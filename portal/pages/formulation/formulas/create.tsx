import React, { ReactElement } from "react";
import { Button, Typography, Box, Container } from "@mui/material";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { FormulaForm } from "@/features/formula";
import { CreateLayout } from "@/components/layouts";

const FormulaCreatePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <CreateLayout
      breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
      header={<Typography variant="title">Create New Formula</Typography>}
    >
      <FormulaForm />
    </CreateLayout>
  );
};

export default FormulaCreatePage;
