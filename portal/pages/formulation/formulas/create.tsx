import React, { ReactElement, useRef } from "react";
import { Breadcrumbs } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { FormulaForm } from "@/features/formula";
import { CreateLayout } from "@/layouts";
import { useRouter } from "next/router";

const FormulaCreatePage = () => {
  const { breadcrumbs } = useBreadcrumbs();
  const router = useRouter();
  const actionRef = useRef();

  return (
    <CreateLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
      <FormulaForm />
    </CreateLayout>
  );
};

export default FormulaCreatePage;
