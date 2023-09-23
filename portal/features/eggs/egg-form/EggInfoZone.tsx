import { InfoZoneCard } from "@/components";
import React, { useEffect } from "react";
import { useGetEggSummaryQuery } from '../services';

const EggInfoZone = ({id}: {id: number}) => {
  const { data, error, isLoading } = useGetEggSummaryQuery(id);

  return (
    <InfoZoneCard data={data} isLoading={isLoading}/>
  )
}

export default EggInfoZone;