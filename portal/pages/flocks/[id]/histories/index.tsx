import React, { useEffect, useState } from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import { FlockHistoryList } from "@/features/flocks";
import { useRouter } from "next/router";
import { NextPageContext } from "next";

const FlockHistoryPage = ({ id }: { id: number }) => {
  const { breadcrumbs } = useBreadcrumbs();
  const router = useRouter();

  return (
    <ListLayout
      breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
      header={<Typography variant="title">Flock</Typography>}
      actions={<Actions />}
    >
      <FlockHistoryList id={id} />
    </ListLayout>
  );
};

const Actions = () => {
  return <></>;
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return {
    props: { id },
  };
}

export default FlockHistoryPage;
