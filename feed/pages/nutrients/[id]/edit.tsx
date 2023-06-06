import React from "react";
import { NextPageContext } from "next";
import { Button, Typography, Box, Container } from "@mui/material";
import { EditLayout } from "@/components/layouts";
import { NutrientForm, NutrientService } from "@/features/nutrients";
import { Breadcrumbs } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { Nutrient } from "@/models";
import client from "@/services/client";
import { redirect } from "next/dist/server/api-utils";

const NutrientEditPage = ({ data }: { data: Nutrient }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <EditLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
      <Container maxWidth="xl">
        <NutrientForm nutrient={data} />
      </Container>
    </EditLayout>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  try {
    const res = await NutrientService.getById(Number(id));

    // context.resolvedUrl
    if (res.status != 200)
      return {
        redirect: {
          permanent: false,
          destination: `/${res.status}?id=${id}&from=/nutrients&next=/nutrients`,
        },
      };

    const data = res.data;

    return { props: { data } };
  } catch (ex) {
    console.log(ex);
    return {
      redirect: {
        permanent: false,
        destination: `/404?id=${id}&from=/nutrients&next=/nutrients&error=unknown`,
      },
    };
  }
}

export default NutrientEditPage;
