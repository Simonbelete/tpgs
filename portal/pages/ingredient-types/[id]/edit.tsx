import React from "react";
import { NextPageContext } from "next";
import { Container, Stack, Button } from "@mui/material";
import { EditLayout } from "@/layouts";
import {
  IngredientTypeForm,
  IngredientTypeService,
} from "@/features/ingredient-types";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { Nutrient } from "@/models";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";

const IngredientTypeEditPage = ({ data }: { data: Nutrient }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <EditLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
    actions={<Actions />}
    >
      <Container maxWidth="xl">
        <IngredientTypeForm ingredient_type={data} />
      </Container>
    </EditLayout>
  );
};

const Actions = () => {
  return (
    <Stack
        spacing={2}
        direction={"row"}
        justifyContent="flex-start"
        alignItems="center"
      >
        <Link href="/houses/create">
          <Button variant="contained" size={"small"} startIcon={<AddIcon />}>
            Create New
          </Button>
        </Link>
      </Stack>
  )
} 

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  try {
    const res = await IngredientTypeService.getById(Number(id));

    // context.resolvedUrl
    if (res.status != 200)
      return {
        redirect: {
          permanent: false,
          destination: `/${res.status}?id=${id}&from=/ingredient-types&next=/units`,
        },
      };

    const data = res.data;

    return { props: { data } };
  } catch (ex) {
    return {
      redirect: {
        permanent: false,
        destination: `/404?id=${id}&from=/ingredient-types&next=/ingredient-types&error=unknown`,
      },
    };
  }
}

export default IngredientTypeEditPage;
