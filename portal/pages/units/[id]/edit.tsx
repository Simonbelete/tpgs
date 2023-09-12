import React from "react";
import { NextPageContext } from "next";
import { Container } from "@mui/material";
import { EditLayout } from "@/layouts";
import { UnitForm, UnitService } from "@/features/units";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { Nutrient } from "@/models";

const UnitEditPage = ({ data }: { data: Nutrient }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <EditLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
      <Container maxWidth="xl">
        <UnitForm unit={data} />
      </Container>
    </EditLayout>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  try {
    const res = await UnitService.getById(Number(id));

    // context.resolvedUrl
    if (res.status != 200)
      return {
        redirect: {
          permanent: false,
          destination: `/${res.status}?id=${id}&from=/units&next=/units`,
        },
      };

    const data = res.data;

    return { props: { data } };
  } catch (ex) {
    return {
      redirect: {
        permanent: false,
        destination: `/404?id=${id}&from=/units&next=/units&error=unknown`,
      },
    };
  }
}

export default UnitEditPage;
