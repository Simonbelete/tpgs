import React from "react";
import { NextPageContext } from "next";
import { Container } from "@mui/material";
import { EditLayout } from "@/layouts";
import { WeightForm, WeightService } from "@/features/weights";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { Weight } from "@/models";

const WeightEditPage = ({ data }: { data: Weight }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <EditLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
      <Container maxWidth="xl">
        <WeightForm weight={data} />
      </Container>
    </EditLayout>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  try {
    const res = await WeightService.getByIdSSR(context, Number(id));

    if (res.status != 200)
      return {
        redirect: {
          permanent: false,
          destination: `/${res.status}?id=${id}&from=/weights&next=/weights`,
        },
      };

    const data = res.data;

    return { props: { data } };
  } catch (ex) {
    return {
      redirect: {
        permanent: false,
        destination: `/404?id=${id}&from=/weights&next=/weights&error=unknown`,
      },
    };
  }
}

export default WeightEditPage;
