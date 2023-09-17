import React from "react";
import { NextPageContext } from "next";
import { Container, Button, Stack } from "@mui/material";
import { StatDashboardLayout } from "@/layouts";
import { FlockView, FlockService } from "@/features/flocks";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { Flock } from "@/models";

const FlockDashboardPage = ({ data }: { data: Flock }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <StatDashboardLayout
      breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
    >
      <Container maxWidth="xl">
        <FlockView flock={data} />
      </Container>
    </StatDashboardLayout>
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

export default FlockDashboardPage;
