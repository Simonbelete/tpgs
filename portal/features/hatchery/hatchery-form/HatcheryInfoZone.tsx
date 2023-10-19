import { InfoZoneCard } from "@/components";
import React, { useEffect } from "react";
import { useGetHatcherySummaryQuery } from "../services";

const HatcheryInfoZone = ({ id }: { id: number }) => {
  const { data, error, isLoading } = useGetHatcherySummaryQuery(id);

  return <InfoZoneCard data={data} isLoading={isLoading} />;
};

export default HatcheryInfoZone;
