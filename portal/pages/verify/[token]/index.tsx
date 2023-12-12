import React, { ReactElement } from "react";
import { VerifyInvitation } from "@/features/invitations";
import { SeoHead } from "@/seo";
import { getSession } from "next-auth/react";
import { NextPageContext } from "next";
import { getInvitationDetailSSR } from "@/features/invitations/services";
import { Invitation } from "@/models";

const VerifyInvitationPage = ({
  token,
  data,
}: {
  token: string;
  data: Invitation;
}) => {
  return (
    <>
      <SeoHead title="Join" />
      <VerifyInvitation token={token} data={data} />
    </>
  );
};

VerifyInvitationPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export async function getServerSideProps(context: NextPageContext) {
  const { token } = context.query;

  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  try {
    const res = await getInvitationDetailSSR(context, String(token));

    if (res.status != 200)
      return {
        redirect: {
          permanent: false,
          destination: `/${res.status}?id=${token}&code=${res.status}`,
        },
      };

    return { props: { token: token, data: res.data } };
  } catch (ex) {
    return {
      redirect: {
        permanent: false,
        destination: `/verify/error?id=${token}`,
      },
    };
  }
}

export default VerifyInvitationPage;
