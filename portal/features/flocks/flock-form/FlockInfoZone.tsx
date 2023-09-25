import { InfoZoneCard } from "@/components";
import React, { useEffect } from "react";
import { useGetFlockSummaryQuery } from '../services';

const FlockInfoZone = ({id}: {id: number}) => {
  const { data, error, isLoading } = useGetFlockSummaryQuery(id);

  return (
    <InfoZoneCard data={data} isLoading={isLoading}/>
  )
}

export default FlockInfoZone;