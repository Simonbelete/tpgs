import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import { UnitHistoryList } from "@/features/units";
import { NextPageContext } from "next";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";
import { getUnitByIdSSR } from "@/features/units/services";
import { Unit } from "@/models";

const UnitHistoryPage = ({ data }: { data: Unit }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Unit Histories" />
      <ListLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        header={<Typography variant="title">Unit History</Typography>}
      >
        <UnitHistoryList data={data} />
      </ListLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return getServerSidePropsContext<Unit>({
    context,
    id: Number(id),
    getByIdSSR: getUnitByIdSSR,
  });
}

export default UnitHistoryPage;
