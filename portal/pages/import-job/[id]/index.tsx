import React from "react";
import { NextPageContext } from "next";
import { EditLayout } from "@/layouts";
import { ImportJobView } from "@/features/import-export-job";
import { getImportJobByIdSSR } from "@/features/import-export-job/services";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { ImportJob, Pen } from "@/models";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";

const PenEditPage = ({ data }: { data: ImportJob }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title={`${data.display_name || ""} - Edit`} />
      <EditLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <ImportJobView data={data} />
      </EditLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return getServerSidePropsContext<Pen>({
    context,
    id: Number(id),
    getByIdSSR: getImportJobByIdSSR,
  });
}

export default PenEditPage;
