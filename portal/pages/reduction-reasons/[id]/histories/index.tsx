import React, { useEffect, useState } from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import { PenHistoryList } from "@/features/pen";
import { useRouter } from "next/router";
import { NextPageContext } from "next";
import { SeoHead } from "@/seo";

const PenHistoryPage = ({ id }: { id: number }) => {
  const { breadcrumbs } = useBreadcrumbs();
  const router = useRouter();

  return (
    <>
      <SeoHead title="Pen Histories" />
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Histories</Typography>}
      >
        <PenHistoryList id={id} />
      </ListLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return {
    props: { id },
  };
}

export default PenHistoryPage;