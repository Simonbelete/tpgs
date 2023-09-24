import React from "react";
import { NextPageContext } from "next";
import { Button, Typography, Stack, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import { EditLayout } from "@/layouts";
import { FeedForm } from "@/features/breeds";
import { getFeedByIdSSR } from '@/features/breeds/services';
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { Feed } from "@/models";
import { SeoHead } from "@/seo";

const BreeedEditPage = ({ data }: { data: Feed }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
    <SeoHead title={`${data.name || ""} - Edit`} />
    <EditLayout
      breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
      header={<Typography variant="title">{data.name} - Edit</Typography>}
      actions={<Actions />}
    >
        <FeedForm breed={data} />
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
        <Link href="/feeds/create">
          <Button variant="outlined" size={"small"} startIcon={<AddIcon />}>
            Create New
          </Button>
        </Link>
        <Link href="/feeds">
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
    const res = await getFeedByIdSSR(context, Number(id));
    
    if (res.status != 200)
      return {
        redirect: {
          permanent: false,
          destination: `/${res.status}?id=${id}&from=/breeds&next=/breeds`,
        },
      };

    return { props: { data: res.data } };
  } catch (ex) {
    return {
      redirect: {
        permanent: false,
        destination: `/404?id=${id}&from=/breeds&next=/breeds&error=unknown`,
      },
    };
  }
}

export default BreeedEditPage;
