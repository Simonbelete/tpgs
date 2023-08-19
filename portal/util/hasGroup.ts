import { getCsrfToken, getSession } from "next-auth/react";

export default async (group: string): Promise<boolean> => {
  const session = await getSession();
  return session?.user?.groups?.includes(group) || false;
};
