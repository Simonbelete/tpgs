import { InfoZoneCard } from "@/components";
import React, { useEffect } from "react";
import { useGetHouseSummaryQuery } from '../services';

const HouseInfoZone = ({id}: {id: number}) => {
  const { data, error, isLoading } = useGetHouseSummaryQuery(id);

  return (
    <InfoZoneCard data={data} isLoading={isLoading}/>
  )
}

export default HouseInfoZone;