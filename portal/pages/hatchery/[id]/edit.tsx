import React from "react";
import { NextPageContext } from "next";
import { Typography, Stack, IconButton, Tooltip } from "@mui/material";
import Link from "next/link";
import { EditLayout } from "@/layouts";
import { HatcheryForm } from "@/features/pen";
import { getHatcheryByIdSSR } from "@/features/pen/services";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { Hatchery } from "@/models";
import { SeoHead } from "@/seo";
import CancelIcon from "@mui/icons-material/Cancel";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import { useRouter } from "next/router";

const HatcheryEditPage = ({ data }: { data: Hatchery }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title={`${data.name || ""} - Edit`} />
      <EditLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">{data.name} - Edit</Typography>}
        actions={<Actions />}
      >
        <HatcheryForm pen={data} />
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
    const res = await getHatcheryByIdSSR(context, Number(id));

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

export default HatcheryEditPage;
