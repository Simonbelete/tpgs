import { InfoZoneCard } from "@/components";
import React, { useEffect } from "react";
import { useGetPenSummaryQuery } from "../services";

const PenInfoZone = ({ id }: { id: number }) => {
  const { data, error, isLoading } = useGetPenSummaryQuery(id);

  return <InfoZoneCard data={data} isLoading={isLoading} />;
};

export default PenInfoZone;
