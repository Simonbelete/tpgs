import React from "react";
import { NextPageContext } from "next";
import { Container } from "@mui/material";
import { EditLayout } from "@/components/layouts";
import { PurposeForm, PurposeService } from "@/features/purposes";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { Nutrient } from "@/models";

const PurposeEditPage = ({ data }: { data: Nutrient }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <EditLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
      <Container maxWidth="xl">
        <PurposeForm purpose={data} />
      </Container>
    </EditLayout>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  try {
    const res = await PurposeService.getByIdSSR(context, Number(id));

    if (res.status != 200)
      return {
        redirect: {
          permanent: false,
          destination: `/${res.status}?id=${id}&from=/purposes&next=/purposes`,
        },
      };

    const data = res.data;

    return { props: { data } };
  } catch (ex) {
    return {
      redirect: {
        permanent: false,
        destination: `/404?id=${id}&from=/purposes&next=/purposes&error=unknown`,
      },
    };
  }
}

export default PurposeEditPage;
