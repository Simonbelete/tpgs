import React from "react";
import { NextPageContext } from "next";
import { EditLayout } from "@/layouts";
import { FormulaForm } from "@/features/formula";
import { getFormulaByIdSSR } from "@/features/formula/services";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { Formula } from "@/models";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";

const FormulaEditPage = ({ data }: { data: Formula }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title={`${data.display_name || ""} - Edit`} />
      <EditLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <FormulaForm data={data} />
      </EditLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return getServerSidePropsContext<Formula>({
    context,
    id: Number(id),
    getByIdSSR: getFormulaByIdSSR,
  });
}

export default FormulaEditPage;
