import React from "react";
import { ListLayout } from "@/layouts";
import { useBreadcrumbs } from "@/hooks";
import { Breadcrumbs } from "@/components";
import { GroupList } from "@/features/groups";
import { SeoHead } from "@/seo";
import { GROUP_ADMIN } from "@/constants";
import { withClientGroup } from "@/hoc";

const GroupPage = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title="Group" />
      <ListLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <GroupList />
      </ListLayout>
    </>
  );
};

export default withClientGroup(GroupPage, [GROUP_ADMIN]);
