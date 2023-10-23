import React from "react";
import { NextPageContext } from "next";
import { Button, Typography, Stack, Tooltip, IconButton } from "@mui/material";
import Link from "next/link";
import { EditLayout } from "@/layouts";
import { NutrientForm } from "@/features/nutrients";
import { getNutrientByIdSSR } from "@/features/nutrients/services";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { Nutrient } from "@/models";
import { SeoHead } from "@/seo";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import CancelIcon from "@mui/icons-material/Cancel";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { useRouter } from "next/router";

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
  const router = useRouter();

  return (
    <Stack
      spacing={0}
      direction={"row"}
      justifyContent="flex-start"
      alignItems="center"
    >
      <Tooltip title="Create New">
        <Link href="/nutrients/create">
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
        <Link href="/nutrients">
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
