import React from "react";
import { NextPageContext } from "next";
import { Container, Typography } from "@mui/material";
import { EditLayout } from "@/components/layouts";
import {
  NutrientGroupForm,
  nutrientGroupService,
} from "@/features/nutrient-group";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { Nutrient } from "@/models";

const NutrientGroupEditPage = ({ data }: { data: Nutrient }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <EditLayout
      breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
      header={<Typography variant="title">{data.name} - Edit</Typography>}
    >
      <Container maxWidth="xl">
        <NutrientGroupForm nutrient_group={data} />
      </Container>
    </EditLayout>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  try {
    const res = await nutrientGroupService.getByIdSSR(context, Number(id));

    if (res.status != 200)
      return {
        redirect: {
          permanent: false,
          destination: `/${res.status}?id=${id}&from=/nutrient-groups&next=/units`,
        },
      };

    const data = res.data;

    return { props: { data } };
  } catch (ex) {
    return {
      redirect: {
        permanent: false,
        destination: `/404?id=${id}&from=/nutrient-groups&next=/units&error=unknown`,
      },
    };
  }
}

export default NutrientGroupEditPage;
