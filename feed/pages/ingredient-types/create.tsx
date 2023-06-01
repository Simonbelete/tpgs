import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { IngredientTypeForm } from "@/features/ingredient-type";

const IngredientTypeCreatePage = () => {
  const router = useRouter();

  useEffect(() => {
    const pathWithoutQuery = router.asPath.split("?")[0];
    let pathArray = pathWithoutQuery.split("/");
    pathArray.shift();

    pathArray = pathArray.filter((path) => path !== "");

    const breadcrumbs = pathArray.map((path, index) => {
      const href = "/" + pathArray.slice(0, index + 1).join("/");
      return {
        href,
        label: path.charAt(0).toUpperCase() + path.slice(1),
      };
    });

    console.log(breadcrumbs);
  }, [router.asPath]);

  return (
    <>
      <IngredientTypeForm />
    </>
  );
};

export default IngredientTypeCreatePage;
