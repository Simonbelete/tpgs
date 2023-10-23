import React from "react";
import { NextPageContext } from "next";
import { Typography, Stack, IconButton, Tooltip } from "@mui/material";
import Link from "next/link";
import { EditLayout } from "@/layouts";
import { NutrientGroupForm } from "@/features/nutrient-group";
import { getNutrientGroupByIdSSR } from "@/features/nutrient-group/services";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { NutrientGroup } from "@/models";
import { SeoHead } from "@/seo";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import CancelIcon from "@mui/icons-material/Cancel";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { useRouter } from "next/router";

const NutrientGroupEditPage = ({ data }: { data: NutrientGroup }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title={`${data.name || ""} - Edit`} />
      <EditLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">{data.name} - Edit</Typography>}
        actions={<Actions id={data.id} />}
      >
        <NutrientGroupForm nutrientGroup={data} />
      </EditLayout>
    </>
  );
};

const Actions = ({ id }: { id: number }) => {
  const router = useRouter();

  return (
    <Stack
      spacing={0}
      direction={"row"}
      justifyContent="flex-start"
      alignItems="center"
    >
      <Tooltip title="Create New">
        <Link href="/nutrient-groups/create">
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
        <Link href="/nutrient-groups">
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
