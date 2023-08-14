import React, { ReactElement, useRef, useImperativeHandle } from "react";
import { Typography, Stack, Button } from "@mui/material";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { ActionLayout } from "@/components/layouts";
import { Formulation } from "@/features/formula";

const FormulationExperimentalPage = () => {
  const { breadcrumbs } = useBreadcrumbs();
  const createRef = useRef();

  return (
    <ActionLayout
      breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
      header={<Typography variant="title">Formulate</Typography>}
      actions={
        <>
          <Stack
            spacing={2}
            direction={"row"}
            justifyContent="flex-start"
            alignItems="center"
          >
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                if (createRef.current != undefined)
                  (createRef.current as any).save();
              }}
            >
              Save
            </Button>
          </Stack>
        </>
      }
    >
      <Formulation />
    </ActionLayout>
  );
};

export default FormulationExperimentalPage;
