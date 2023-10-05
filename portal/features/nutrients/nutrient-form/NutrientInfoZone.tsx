import { InfoZoneCard } from "@/components";
import React, { useEffect } from "react";
import { useGetNutrientSummaryQuery } from '../services';

const NutrientInfoZone = ({id}: {id: number}) => {
  const { data, error, isLoading } = useGetNutrientSummaryQuery(id);

  return (
    <InfoZoneCard data={data} isLoading={isLoading}/>
  )
}

export default NutrientInfoZone;