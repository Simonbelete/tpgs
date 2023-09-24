import { InfoZoneCard } from "@/components";
import React, { useEffect } from "react";
import { useGetFeedSummaryQuery } from '../services';

const FeedInfoZone = ({id}: {id: number}) => {
  const { data, error, isLoading } = useGetFeedSummaryQuery(id);

  return (
    <InfoZoneCard data={data} isLoading={isLoading}/>
  )
}

export default FeedInfoZone;