import { InfoZoneCard } from "@/components";
import React, { useEffect } from "react";
import { useGetChickenSummaryQuery } from '../services';

const ChickenInfoZone = ({id}: {id: number}) => {
  const { data, error, isLoading } = useGetChickenSummaryQuery(id);

  return (
    <InfoZoneCard data={data} isLoading={isLoading}/>
  )
}

export default ChickenInfoZone;