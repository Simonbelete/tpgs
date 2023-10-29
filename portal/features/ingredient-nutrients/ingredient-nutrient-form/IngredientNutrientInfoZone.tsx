import { InfoZoneCard } from "@/components";
import React, { useEffect } from "react";
import { useGetIngredientNutrientSummaryQuery } from "../services";

const IngredientNutrientInfoZone = ({ id }: { id: number }) => {
  const { data, error, isLoading } = useGetIngredientNutrientSummaryQuery(id);

  return <InfoZoneCard data={data} isLoading={isLoading} />;
};

export default IngredientNutrientInfoZone;
