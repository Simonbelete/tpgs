import { InfoZoneCard } from "@/components";
import React, { useEffect } from "react";
import { useGetIngredientTypeSummaryQuery } from '../services';

const IngredientTypeInfoZone = ({id}: {id: number}) => {
  const { data, error, isLoading } = useGetIngredientTypeSummaryQuery(id);

  return (
    <InfoZoneCard data={data} isLoading={isLoading}/>
  )
}

export default IngredientTypeInfoZone;