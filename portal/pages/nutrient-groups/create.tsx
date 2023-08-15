import React, { useEffect, ReactElement, useRef } from "react";
import { NutrientGroupForm } from "@/features/nutrient-group";
import { Breadcrumbs } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { CreateLayout } from "@/components/layouts";
import { Button, Typography, Box, Container } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";

const NutrientGroupCreatePage = () => {
  const { breadcrumbs } = useBreadcrumbs();
  const router = useRouter();
  const actionRef = useRef();

  return (
    <CreateLayout
      breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
      header={<Typography variant="title">Create Nutrient Group</Typography>}
      actions={
        <>
          <Box>
            <Button
              variant="contained"
              size="small"
              startIcon={<SaveIcon />}
              onClick={() => {
                console.log("ddd");
                if (actionRef.current != undefined)
                  (actionRef.current as any).create();
              }}
            >
              Create
            </Button>
          </Box>
          <Box>
            <Button
              variant="outlined"
              size="small"
              startIcon={<LibraryAddIcon />}
              onClick={() => {
                console.log("ddd");
                if (actionRef.current != undefined)
                  (actionRef.current as any).createAndNew();
              }}
            >
              Create and New
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
        </>
      }
    >
      <Container maxWidth="md">
        <NutrientGroupForm actionRef={actionRef} />
      </Container>
    </CreateLayout>
  );
};

export default NutrientGroupCreatePage;
