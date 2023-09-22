import { InfoZoneCard } from "@/components";
import React, { useEffect } from "react";
import { useGetUnitSummaryQuery } from '../services';

const HouseInfoZone = ({id}: {id: number}) => {
  const { data, error, isLoading } = useGetUnitSummaryQuery(id);

  return (
    <InfoZoneCard data={data} isLoading={isLoading}/>
  )
}

export default HouseInfoZone;