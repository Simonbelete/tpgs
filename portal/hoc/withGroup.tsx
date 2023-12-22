import { NextPageContext } from "next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { signOut } from "next-auth/react";

const withGroup = async (context: NextPageContext, groups: string[]) => {
  const session = await getServerSession(
    // @ts-ignore
    context.req,
    context.res,
    authOptions
  );

  if (session) {
    if (
      session?.user?.is_superuser ||
      session?.user?.groups?.some((e) => groups.includes(e))
    ) {
    } else {
      return {
        redirect: {
          permanent: true,
          destination: "/dashboard",
        },
      };
    }
  } else {
    return {
      redirect: {
        permanent: true,
        destination: "/auth/signout",
      },
    };
  }
};

export default withGroup;
