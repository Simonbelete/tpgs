import React from "react";
import { Breadcrumbs } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { CreateLayout } from "@/layouts";
import { SeoHead } from "@/seo";
import { ExportJobForm } from "@/features/import-export-job";

const ExportJobCreatePage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Create Export Job" />
      <CreateLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <ExportJobForm />
      </CreateLayout>
    </>
  );
};

export default ExportJobCreatePage;
