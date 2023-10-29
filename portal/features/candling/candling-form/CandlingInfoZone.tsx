import { InfoZoneCard } from "@/components";
import React, { useEffect } from "react";
import { useGetCandlingSummaryQuery } from "../services";

const CandlingInfoZone = ({ id }: { id: number }) => {
  const { data, error, isLoading } = useGetCandlingSummaryQuery(id);

  return <InfoZoneCard data={data} isLoading={isLoading} />;
};

export default CandlingInfoZone;
