import { InfoZoneCard } from "@/components";
import React, { useEffect } from "react";
import { useGetNutrientGroupSummaryQuery } from '../services';

const NutrientGroupInfoZone = ({id}: {id: number}) => {
  const { data, error, isLoading } = useGetNutrientGroupSummaryQuery(id);

  return (
    <InfoZoneCard data={data} isLoading={isLoading}/>
  )
}

export default NutrientGroupInfoZone;