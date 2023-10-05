import { InfoZoneCard } from "@/components";
import React, { useEffect } from "react";
import { useGetIngredientSummaryQuery } from '../services';

const IngredientInfoZone = ({id}: {id: number}) => {
  const { data, error, isLoading } = useGetIngredientSummaryQuery(id);

  return (
    <InfoZoneCard data={data} isLoading={isLoading}/>
  )
}

export default IngredientInfoZone;