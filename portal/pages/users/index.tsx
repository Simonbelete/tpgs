import React, { ReactElement, useState } from "react";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs, Loading } from "@/components";
import { ListLayout } from "@/layouts";
import { UserList } from "@/features/users";
import { SeoHead } from "@/seo";
import { withClientGroup } from "@/hoc";
import { GROUP_ADMIN } from "@/constants";

const UsersPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Users" />
      <ListLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <UserList />
      </ListLayout>
    </>
  );
};

export default withClientGroup(UsersPage, [GROUP_ADMIN]);
