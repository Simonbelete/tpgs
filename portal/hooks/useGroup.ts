import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { GROUP_ADMIN, GROUP_FARMER } from "@/constants";

const useGroup = () => {
  const { data: session, status } = useSession();
  const [isSuperUser, setIsSuperUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isFarmer, setIsFarmer] = useState(false);

  useEffect(() => {
    if (session?.user == null) return;

    setIsSuperUser(session.user.is_superuser || false);
    if (session.user.groups?.includes(GROUP_ADMIN)) setIsAdmin(true);
    if (session.user.groups?.includes(GROUP_FARMER)) setIsFarmer(true);
  }, [session]);

  return { isSuperUser, isAdmin, isFarmer };
};

export default useGroup;
