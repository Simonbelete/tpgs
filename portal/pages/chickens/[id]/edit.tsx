import React from "react";
import { NextPageContext } from "next";
import {
  Button,
  Typography,
  Stack,
  Container,
  IconButton,
  Tooltip,
} from "@mui/material";
import Link from "next/link";
import { EditLayout } from "@/layouts";
import { ChickenForm } from "@/features/chickens";
import { getChickenByIdSSR } from "@/features/chickens/services";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { Chicken } from "@/models";
import { SeoHead } from "@/seo";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import CancelIcon from "@mui/icons-material/Cancel";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { useRouter } from "next/router";

const ChickenEditPage = ({ data }: { data: Chicken }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title={`${data.tag || ""} - Edit`} />
      <EditLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">{data.tag} - Edit</Typography>}
        actions={<Actions />}
      >
        <ChickenForm chicken={data} />
      </EditLayout>
    </>
  );
};

const Actions = () => {
  const router = useRouter();

  return (
    <Stack
      spacing={0}
      direction={"row"}
      justifyContent="flex-start"
      alignItems="center"
    >
      <Tooltip title="Dashboard">
        <IconButton color="secondary">
          <AnalyticsIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Create New">
        <Link href="/chickens/create">
          <IconButton color="secondary">
            <LibraryAddIcon />
          </IconButton>
        </Link>
      </Tooltip>
      <Tooltip title="Histories">
        <Link href={`${router.pathname.split("/edit")[0]}/histories`}>
          <IconButton color="secondary">
            <ManageHistoryIcon />
          </IconButton>
        </Link>
      </Tooltip>
      <Tooltip title="Cancel">
        <Link href="/chickens">
          <IconButton color="secondary">
            <CancelIcon />
          </IconButton>
        </Link>
      </Tooltip>
    </Stack>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  try {
    const res = await getChickenByIdSSR(context, Number(id));

    if (res.status != 200)
      return {
        redirect: {
          permanent: false,
          destination: `/${res.status}?id=${id}&from=/chickens&next=/chickens`,
        },
      };

    return { props: { data: res.data } };
  } catch (ex) {
    return {
      redirect: {
        permanent: false,
        destination: `/404?id=${id}&from=/chickens&next=/chickens&error=unknown`,
      },
    };
  }
}

export default ChickenEditPage;
