import { InfoZoneCard } from "@/components";
import React, { useEffect } from "react";
import { useGetSummaryQuery } from '../services';

const HouseInfoZone = ({id}: {id: number}) => {
  const { data, error, isLoading } = useGetSummaryQuery(id);

  return (
    <InfoZoneCard data={data} isLoading={isLoading}/>
  )
}

export default HouseInfoZone;