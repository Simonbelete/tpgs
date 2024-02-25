import React from "react";
import { Breadcrumbs } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { CreateLayout } from "@/layouts";
import { SeoHead } from "@/seo";
import { ImportJobForm } from "@/features/import-export-job";

const ImportJobCreatePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Create Import Job" />
      <CreateLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <ImportJobForm />
      </CreateLayout>
    </>
  );
};

export default ImportJobCreatePage;
