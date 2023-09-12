import React from "react";
import { NextPageContext } from "next";
import { Container, Button, Stack } from "@mui/material";
import { EditLayout } from "@/layouts";
import { FeedView, FeedService } from "@/features/feeds";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { Feed } from "@/models";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";
import EditIcon from "@mui/icons-material/Edit";

const FeedEditPage = ({ data }: { data: Feed }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <EditLayout
      breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
      actions={<Actions />}
    >
      <Container maxWidth="xl">
        <FeedView feed={data} />
      </Container>
    </EditLayout>
  );
};

const Actions = () => {
  const router = useRouter();
  return (
    <Stack
      spacing={2}
      direction={"row"}
      justifyContent="flex-start"
      alignItems="center"
    >
      <Link href={`${router.pathname}/edit`}>
        <Button variant="outlined" startIcon={<EditIcon />} size="small">
          Edit
        </Button>
      </Link>
      <Link href={`nutrient-groups/create`}>
        <Button variant="outlined" startIcon={<AddIcon />} size="small">
          New
        </Button>
      </Link>
    </Stack>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  try {
    const res = await FeedService.getByIdSSR(context, Number(id));

    if (res.status != 200)
      return {
        redirect: {
          permanent: false,
          destination: `/${res.status}?id=${id}&from=/feeds&next=/feeds`,
        },
      };

    const data = res.data;

    return { props: { data } };
  } catch (ex) {
    return {
      redirect: {
        permanent: false,
        destination: `/404?id=${id}&from=/feeds&next=/feeds&error=unknown`,
      },
    };
  }
}

export default FeedEditPage;
