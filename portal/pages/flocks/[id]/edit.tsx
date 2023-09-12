import React from "react";
import { NextPageContext } from "next";
import { Container } from "@mui/material";
import { EditLayout } from "@/layouts";
import { FlockForm, FlockService } from "@/features/flocks";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { Nutrient } from "@/models";

const FlockEditPage = ({ data }: { data: Nutrient }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <EditLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
      <Container maxWidth="xl">
        <FlockForm flock={data} />
      </Container>
    </EditLayout>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  try {
    const res = await FlockService.getByIdSSR(context, Number(id));

    if (res.status != 200)
      return {
        redirect: {
          permanent: false,
          destination: `/${res.status}?id=${id}&from=/flocks&next=/flocks`,
        },
      };

    const data = res.data;

    return { props: { data } };
  } catch (ex) {
    return {
      redirect: {
        permanent: false,
        destination: `/404?id=${id}&from=/flocks&next=/flocks&error=unknown`,
      },
    };
  }
}

export default FlockEditPage;
