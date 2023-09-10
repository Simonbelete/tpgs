import React, { useEffect } from "react";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import Loading from "./Loading";

const Redirect403 = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/403");
  }, [])
  return <Loading />
}

export default Redirect403;