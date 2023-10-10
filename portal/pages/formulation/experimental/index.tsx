import React, { ReactElement, useRef, useImperativeHandle } from "react";
import { Typography, Stack, Button } from "@mui/material";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { ActionLayout } from "@/layouts";
import { Formulation } from "@/features/formula";

const FormulationExperimentalPage = () => {
  const { breadcrumbs } = useBreadcrumbs();
  const saveRef = useRef();

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
                console.log("ddd");
                if (saveRef.current != undefined)
                  (saveRef.current as any).save();
              }}
            >
              Save
            </Button>
          </Stack>
        </>
      }
    >
      <Formulation saveRef={saveRef} />
    </ActionLayout>
  );
};

export default FormulationExperimentalPage;
