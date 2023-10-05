import React from "react";
import { NextPageContext } from "next";
import { Button, Typography, Stack, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import { EditLayout } from "@/layouts";
import { NutrientForm } from "@/features/nutrients";
import { getNutrientByIdSSR } from '@/features/nutrients/services';
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { Nutrient } from "@/models";
import { SeoHead } from "@/seo";

const NutrientEditPage = ({ data }: { data: Nutrient }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
    <SeoHead title={`${data.name || ""} - Edit`} />
    <EditLayout
      breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
      header={<Typography variant="title">{data.name} - Edit</Typography>}
      actions={<Actions />}
    >
        <NutrientForm nutrient={data} />
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
        <Link href="/breeds/create">
          <Button variant="outlined" size={"small"} startIcon={<AddIcon />}>
            Create New
          </Button>
        </Link>
        <Link href="/breeds">
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
    const res = await getNutrientByIdSSR(context, Number(id));
    
    if (res.status != 200)
      return {
        redirect: {
          permanent: false,
          destination: `/${res.status}?id=${id}&from=/nutrients&next=/nutrients`,
        },
      };

    return { props: { data: res.data } };
  } catch (ex) {
    return {
      redirect: {
        permanent: false,
        destination: `/404?id=${id}&from=/nutrients&next=/nutrients&error=unknown`,
      },
    };
  }
}

export default NutrientEditPage;
