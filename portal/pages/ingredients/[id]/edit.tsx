import React from "react";
import { NextPageContext } from "next";
import { Container, Typography } from "@mui/material";
import { EditLayout } from "@/components/layouts";
import { IngredientForm, IngredientService } from "@/features/ingredients";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { Ingredient } from "@/models";

const IngredientEditPage = ({ data }: { data: Ingredient }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <EditLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
    header={<Typography variant="title">{data.name} - Edit</Typography>}
    >
      <Container maxWidth="xl">
        <IngredientForm ingredient={data} />
      </Container>
    </EditLayout>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  try {
    const res = await IngredientService.getByIdSSR(context, Number(id));

    if (res.status != 200)
      return {
        redirect: {
          permanent: false,
          destination: `/${res.status}?id=${id}&from=/ingredients&next=/ingredients`,
        },
      };

    const data = res.data;

    return { props: { data } };
  } catch (ex) {
    return {
      redirect: {
        permanent: false,
        destination: `/404?id=${id}&from=/ingredients&next=/ingredients&error=unknown`,
      },
    };
  }
}

export default IngredientEditPage;
