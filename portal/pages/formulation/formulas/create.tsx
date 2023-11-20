import React, { ReactElement, useRef } from "react";
import { Button, Typography, Box, Container, Stack } from "@mui/material";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { FormulaForm } from "@/features/formula";
import { CreateLayout, ActionLayout } from "@/layouts";
import { useRouter } from "next/router";
import PrintIcon from "@mui/icons-material/Print";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";

const FormulaCreatePage = () => {
  const { breadcrumbs } = useBreadcrumbs();
  const router = useRouter();
  const actionRef = useRef();

  return (
    <ActionLayout
      breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
      header={<Typography variant="title">Create New Formula</Typography>}
      actions={
        <>
          <Stack
            spacing={2}
            direction={"row"}
            justifyContent="flex-start"
            alignItems="center"
          >
            <Box>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                size="small"
                onClick={() => {
                  console.log("ddd");
                  if (actionRef.current != undefined)
                    (actionRef.current as any).formulate();
                }}
              >
                Formulate
              </Button>
            </Box>
            <Box>
              <Button
                variant="outlined"
                size="small"
                startIcon={<LibraryAddIcon />}
                onClick={() => {
                  if (actionRef.current != undefined)
                    (actionRef.current as any).createAndNew();
                }}
              >
                Save
              </Button>
            </Box>
            <Box>
              <Button
                variant="outlined"
                color="error"
                size="small"
                startIcon={<CloseIcon />}
                onClick={() => router.push("/nutrient-groups")}
              >
                Cancel
              </Button>
            </Box>
          </Stack>
        </>
      }
    >
      <FormulaForm />
    </ActionLayout>
  );
};

export default FormulaCreatePage;
