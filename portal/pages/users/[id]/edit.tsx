import React from "react";
import { NextPageContext } from "next";
import { EditLayout } from "@/layouts";
import { UserForm } from "@/features/users";
import { getUserByIdSSR } from "@/features/users/services";
import { Breadcrumbs, Loading } from "@/components";
import { useBreadcrumbs } from "@/hooks";
import { User } from "@/models";
import { SeoHead } from "@/seo";
import { getServerSidePropsContext } from "@/services/getServerSidePropsContext";

const UserEditPage = ({ data }: { data: User }) => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <>
      <SeoHead title={`${data.name || ""} - Edit`} />
      <EditLayout breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <UserForm data={data} />
      </EditLayout>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  return getServerSidePropsContext<User>({
    context,
    id: Number(id),
    getByIdSSR: getUserByIdSSR,
  });
}

export default UserEditPage;
