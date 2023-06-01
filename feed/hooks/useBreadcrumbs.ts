import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Breadcrumb } from "@/models";

const useBreadcrumbs = () => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);

  useEffect(() => {
    const pathWithoutQuery = router.asPath.split("?")[0];
    let pathArray = pathWithoutQuery.split("/");
    pathArray.shift();

    pathArray = pathArray.filter((path) => path !== "");

    const breadcrumbs: Breadcrumb[] = pathArray.map((path, index) => {
      const href = "/" + pathArray.slice(0, index + 1).join("/");
      return {
        href,
        label: path.charAt(0).toUpperCase() + path.slice(1),
      };
    });

    setBreadcrumbs(breadcrumbs);
  }, [router.asPath]);

  return { breadcrumbs };
};

export default useBreadcrumbs;
