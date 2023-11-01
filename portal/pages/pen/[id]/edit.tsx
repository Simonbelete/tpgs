import React from "react";
import { NextPageContext } from "next";
import { Typography, Stack, IconButton, Tooltip } from "@mui/material";
import Link from "next/link";
import { EditLayout } from "@/layouts";
import { PenForm } from "@/features/pen";
import { getPenByIdSSR } from "@/features/pen/services";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { Pen } from "@/models";
import { SeoHead } from "@/seo";
import CancelIcon from "@mui/icons-material/Cancel";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import { useRouter } from "next/router";

const PenEditPage = ({ data }: { data: Pen }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title={`${data.name || ""} - Edit`} />
      <EditLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <PenForm pen={data} />
      </EditLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  try {
    const res = await getPenByIdSSR(context, Number(id));

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

export default PenEditPage;
