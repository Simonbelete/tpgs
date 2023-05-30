import React, { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import dynamic from "next/dynamic";

import { Loading } from "@/components";

const DashboardLayout = dynamic(
  () => import("../components/layouts/DashboardLayout"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

const DashboardPage = () => {
  return <p>Dashboard</p>;
};

DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default DashboardPage;
