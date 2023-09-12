import React from "react";
import { NextPageContext } from "next";
import { Container } from "@mui/material";
import { EditLayout } from "@/layouts";
import { BreedForm, BreedService } from "@/features/breeds";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { Nutrient } from "@/models";

const BreedEditPage = ({ data }: { data: Nutrient }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <EditLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
      <Container maxWidth="xl">
        <BreedForm breed={data} />
      </Container>
    </EditLayout>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  try {
    const res = await BreedService.getByIdSSR(context, Number(id));

    if (res.status != 200)
      return {
        redirect: {
          permanent: false,
          destination: `/${res.status}?id=${id}&from=/breeds&next=/breeds`,
        },
      };

    const data = res.data;

    return { props: { data } };
  } catch (ex) {
    return {
      redirect: {
        permanent: false,
        destination: `/404?id=${id}&from=/breeds&next=/breeds&error=unknown`,
      },
    };
  }
}

export default BreedEditPage;
