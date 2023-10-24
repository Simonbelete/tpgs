import { InfoZoneCard } from "@/components";
import React, { useEffect } from "react";
import { useGetRequirementSummaryQuery } from "../services";

const RequirementInfoZone = ({ id }: { id: number }) => {
  const { data, error, isLoading } = useGetRequirementSummaryQuery(id);

  return <InfoZoneCard data={data} isLoading={isLoading} />;
};

export default RequirementInfoZone;
