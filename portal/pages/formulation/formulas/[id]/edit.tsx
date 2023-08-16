import React, { useRef } from "react";
import { NextPageContext } from "next";
import { Container, Typography, Stack, Button, Box } from "@mui/material";
import { EditLayout } from "@/components/layouts";
import { FormulaForm, FormulaService } from "@/features/formula";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { Formula } from "@/models";
import { useRouter } from "next/router";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";

const IngredientEditPage = ({ data }: { data: Formula }) => {
  const { breadcrumbs } = useBreadcrumbs();
  const router = useRouter();
  const actionRef = useRef();

  return (
    <EditLayout
      breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
      header={<Typography variant="title">{data.name}</Typography>}
      actions={
        <>
          <Stack
            spacing={2}
            direction={"row"}
            justifyContent="flex-start"
            alignItems="center"
          >
            <Box>
              <Button variant="contained" startIcon={<SaveIcon />} size="small">
                Formulate
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
      <Container maxWidth="xl">
        <FormulaForm formula={data} />
      </Container>
    </EditLayout>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  try {
    const res = await FormulaService.getByIdSSR(context, Number(id));

    if (res.status != 200)
      return {
        redirect: {
          permanent: false,
          destination: `/${res.status}?id=${id}&from=/formulation/formulas&next=/formulation/formulas`,
        },
      };

    const data = res.data;

    return { props: { data } };
  } catch (ex) {
    return {
      redirect: {
        permanent: false,
        destination: `/404?id=${id}&from=/formulation/formulas&next=/formulation/formulas&error=unknown`,
      },
    };
  }
}

export default IngredientEditPage;
