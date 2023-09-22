import { InfoZoneCard } from "@/components";
import React, { useEffect } from "react";
import { useGetPurposeSummaryQuery } from '../services';

const HouseInfoZone = ({id}: {id: number}) => {
  const { data, error, isLoading } = useGetPurposeSummaryQuery(id);

  return (
    <InfoZoneCard data={data} isLoading={isLoading}/>
  )
}

export default HouseInfoZone;