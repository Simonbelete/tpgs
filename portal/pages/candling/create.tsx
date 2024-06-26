import React from "react";
import { NextPageContext } from "next";
import { EditLayout } from "@/layouts";
import { HatcheryEggForm } from "@/features/hatchery-egg";
import { getHatcheryEggByIdSSR } from "@/features/hatchery-egg/services";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { HatcheryEgg } from "@/models";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";

const HatcheryEggFormPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Create Candling" />
      <EditLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <HatcheryEggForm />
      </EditLayout>
    </>
  );
};

export default HatcheryEggFormPage;
