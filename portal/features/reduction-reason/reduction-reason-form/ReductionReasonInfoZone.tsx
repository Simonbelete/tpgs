import { InfoZoneCard } from "@/components";
import React, { useEffect } from "react";
import { useGetReductionReasonSummaryQuery } from "../services";

const ReductionReasonInfoZone = ({ id }: { id: number }) => {
  const { data, error, isLoading } = useGetReductionReasonSummaryQuery(id);

  return <InfoZoneCard data={data} isLoading={isLoading} />;
};

export default ReductionReasonInfoZone;
