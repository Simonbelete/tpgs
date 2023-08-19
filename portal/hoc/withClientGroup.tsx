import React, { FC, useEffect } from "react";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";

const withClientGroup = async (WrappedComponent: React.FC, group: string) => {
  const session = await getSession();

  return class withData extends React.Component {
    render(): React.ReactNode {
      if (session?.user?.groups?.includes(group)) return <WrappedComponent />;
      else return redirect("/403");
    }
  };
};

export default withClientGroup;
