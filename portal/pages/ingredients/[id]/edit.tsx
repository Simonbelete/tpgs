import React from "react";
import { NextPageContext } from "next";
import { Button, Typography, Stack, IconButton, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import { EditLayout } from "@/layouts";
import { IngredientForm } from "@/features/ingredients";
import { getIngredientByIdSSR } from "@/features/ingredients/services";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { Ingredient } from "@/models";
import { SeoHead } from "@/seo";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import CancelIcon from "@mui/icons-material/Cancel";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { useRouter } from "next/router";

const BreeedEditPage = ({ data }: { data: Ingredient }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title={`${data.name || ""} - Edit`} />
      <EditLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">{data.name} - Edit</Typography>}
        actions={<Actions />}
      >
        <IngredientForm ingredient={data} />
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
        <Link
          href={`${router.pathname.split("/[id]")[0]}/${
            router.query.id
          }/dashboard`}
        >
          <IconButton color="secondary">
            <AnalyticsIcon />
          </IconButton>
        </Link>
      </Tooltip>
      <Tooltip title="Create New">
        <Link href="/chickens/create">
          <IconButton color="secondary">
            <LibraryAddIcon />
          </IconButton>
        </Link>
      </Tooltip>
      <Tooltip title="Histories">
        <Link
          href={`${router.pathname.split("/[id]")[0]}/${
            router.query.id
          }/histories`}
        >
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
    const res = await getIngredientByIdSSR(context, Number(id));

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
