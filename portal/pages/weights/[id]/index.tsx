import React from "react";
import { NextPageContext } from "next";
import { Container, Button, Stack } from "@mui/material";
import { EditLayout } from "@/components/layouts";
import { WeightView, WeightService } from "@/features/weights";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { Weight } from "@/models";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";
import EditIcon from "@mui/icons-material/Edit";

const WeightEditPage = ({ data }: { data: Weight }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <EditLayout
      breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
      actions={<Actions />}
    >
      <Container maxWidth="xl">
        <WeightView weight={data} />
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
      <Link href={`/weights/create`}>
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
    const res = await WeightService.getByIdSSR(context, Number(id));

    if (res.status != 200)
      return {
        redirect: {
          permanent: false,
          destination: `/${res.status}?id=${id}&from=/weights&next=/weights`,
        },
      };

    const data = res.data;

    return { props: { data } };
  } catch (ex) {
    return {
      redirect: {
        permanent: false,
        destination: `/404?id=${id}&from=/weights&next=/weights&error=unknown`,
      },
    };
  }
}

export default WeightEditPage;
