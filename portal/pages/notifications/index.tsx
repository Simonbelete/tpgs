import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { Typography } from "@mui/material";
import { NotificationList } from "@/features/notification";
import { SeoHead } from "@/seo";

const PenPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Pen" />
      <ListLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <NotificationList />
      </ListLayout>
    </>
  );
};

export default PenPage;
