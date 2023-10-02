import React from "react";
import { NextPageContext } from "next";
import { Button, Typography, Stack, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import { EditLayout } from "@/layouts";
import { WeightForm } from "@/features/weights";
import { getWeightByIdSSR } from '@/features/weights/services';
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { Weight, Chicken } from "@/models";
import { SeoHead } from "@/seo";

const WeightEditPage = ({ data }: { data: Weight }) => {
  const { breadcrumbs } = useBreadcrumbs();

  const TITLE = data.chicken !== null ? (data.chicken as Chicken).name : ""; 

  return (
    <>
    <SeoHead title={`${TITLE} - Edit`} />
    <EditLayout
      breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
      header={<Typography variant="title">{TITLE} - Edit</Typography>}
      actions={<Actions />}
    >
        <WeightForm weight={data} />
    </EditLayout>
    </>
  );
};

const Actions = () => {
  return (
    <Stack
        spacing={2}
        direction={"row"}
        justifyContent="flex-start"
        alignItems="center"
      >
        <Link href="/weights/create">
          <Button variant="outlined" size={"small"} startIcon={<AddIcon />}>
            Create New
          </Button>
        </Link>
        <Link href="/weights">
          <Button variant="outlined" color="error" size={"small"} startIcon={<CloseIcon />}>
            Cancel
          </Button>
        </Link>
      </Stack>
  )
} 

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  try {
    const res = await getWeightByIdSSR(context, Number(id));
    
    if (res.status != 200)
      return {
        redirect: {
          permanent: false,
          destination: `/${res.status}?id=${id}&from=/eggs&next=/eggs`,
        },
      };

    return { props: { data: res.data } };
  } catch (ex) {
    return {
      redirect: {
        permanent: false,
        destination: `/404?id=${id}&from=/eggs&next=/breeds&error=unknown`,
      },
    };
  }
}

export default WeightEditPage;
