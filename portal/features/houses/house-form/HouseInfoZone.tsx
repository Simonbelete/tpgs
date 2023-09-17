import { InfoZoneCard } from "@/components";
import React, { useEffect } from "react";
import { useGetSummaryQuery } from '../services/house';

const HouseInfoZone = ({id}: {id: number}) => {
  const { data, error, isLoading } = useGetSummaryQuery(id);

  return (
    <InfoZoneCard />
  )
}

export default HouseInfoZone;