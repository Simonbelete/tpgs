import React from "react";
import { NextPageContext } from "next";
import { Typography } from "@mui/material";
import { EditLayout } from "@/layouts";
import { RequirementForm } from "@/features/requirements";
import { getRequirementByIdSSR } from "@/features/requirements/services";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { Requirement } from "@/models";
import { SeoHead } from "@/seo";

const RequirementEditPage = ({ data }: { data: Requirement }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title={`${data.name || ""} - Edit`} />
      <EditLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <RequirementForm data={data} />
      </EditLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  try {
    const res = await getRequirementByIdSSR(context, Number(id));

    if (res.status != 200)
      return {
        redirect: {
          permanent: false,
          destination: `/${res.status}?id=${id}&from=/houses&next=/houses`,
        },
      };

    return { props: { data: res.data } };
  } catch (ex) {
    return {
      redirect: {
        permanent: false,
        destination: `/404?id=${id}&from=/houses&next=/units&error=unknown`,
      },
    };
  }
}

export default RequirementEditPage;
