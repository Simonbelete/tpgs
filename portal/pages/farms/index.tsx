import React, { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const FarmPage = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log(session, status);
  }, [status]);
  return <p>hOme</p>;
};

export default FarmPage;
