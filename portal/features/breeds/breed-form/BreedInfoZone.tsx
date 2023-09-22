import { InfoZoneCard } from "@/components";
import React, { useEffect } from "react";
import { useGetBreedSummaryQuery } from '../services';

const HouseInfoZone = ({id}: {id: number}) => {
  const { data, error, isLoading } = useGetBreedSummaryQuery(id);

  return (
    <InfoZoneCard data={data} isLoading={isLoading}/>
  )
}

export default HouseInfoZone;