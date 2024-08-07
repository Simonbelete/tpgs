import React, { FC, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Loading, Redirect403 } from "@/components";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";

const withClientGroup = (WrappedComponent: React.FC, groups: string[]) => {
  const withData = () => {
    const router = useRouter();
    const { data: session, status } = useSession({
      required: true,
      onUnauthenticated() {
        router.push("/");
      },
    });

    if (status == "loading") {
      return <Loading />;
    } else {
      if (
        session?.user?.is_superuser ||
        session?.user?.groups?.some((e) => groups.includes(e))
      )
        return <WrappedComponent />;
      else return <Redirect403 />;
    }
  };

  return withData;
};

export default withClientGroup;
