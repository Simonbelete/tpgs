import React from "react";
import { NextPageContext } from "next";
import { Button, Typography, Stack, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import { EditLayout } from "@/layouts";
import { NutrientGroupForm } from "@/features/nutrient-group";
import { getNutrientGroupByIdSSR } from '@/features/nutrient-group/services';
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { NutrientGroup } from "@/models";
import { SeoHead } from "@/seo";

const NutrientGroupEditPage = ({ data }: { data: NutrientGroup }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
    <SeoHead title={`${data.name || ""} - Edit`} />
    <EditLayout
      breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
      header={<Typography variant="title">{data.name} - Edit</Typography>}
      actions={<Actions />}
    >
        <NutrientGroupForm nutrientGroup={data} />
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
        <Link href="/nutrient-groups/create">
          <Button variant="outlined" size={"small"} startIcon={<AddIcon />}>
            Create New
          </Button>
        </Link>
        <Link href="/nutrient-groups">
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
    const res = await getNutrientGroupByIdSSR(context, Number(id));
    
    if (res.status != 200)
      return {
        redirect: {
          permanent: false,
          destination: `/${res.status}?id=${id}&from=/nutrient-groups&next=/nutrient-groups`,
        },
      };

    return { props: { data: res.data } };
  } catch (ex) {
    return {
      redirect: {
        permanent: false,
        destination: `/404?id=${id}&from=/nutrient-groups&next=/nutrient-groups&error=unknown`,
      },
    };
  }
}

export default NutrientGroupEditPage;
