import { InfoZoneCard } from "@/components";
import React, { useEffect } from "react";
import { useGetWeightSummaryQuery } from '../services';

const WeightInfoZone = ({id}: {id: number}) => {
  const { data, error, isLoading } = useGetWeightSummaryQuery(id);

  return (
    <InfoZoneCard data={data} isLoading={isLoading}/>
  )
}

export default WeightInfoZone;