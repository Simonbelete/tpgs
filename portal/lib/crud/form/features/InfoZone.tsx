import { InfoZoneCard } from "@/components";
import React, { useEffect } from "react";
import {
  ApiEndpointMutation,
  ApiEndpointQuery,
} from "@reduxjs/toolkit/dist/query/core/module";
import { QueryDefinition } from "@reduxjs/toolkit/dist/query";
import { EndpointDefinitions } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { QueryHooks } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { ClientQueyFn } from "@/types";
import { AbstractSummary } from "@/models";

export interface InfoZoneProps {
  id: number;
  summaryEndpoint: ApiEndpointQuery<
    QueryDefinition<number, ClientQueyFn, any, AbstractSummary, any>,
    EndpointDefinitions
  > &
    QueryHooks<
      QueryDefinition<number, ClientQueyFn, any, AbstractSummary, any>
    >;
}

const InfoZone = ({ id, summaryEndpoint }: InfoZoneProps) => {
  const { data, error, isLoading } = summaryEndpoint.useQuery(id);

  return <InfoZoneCard data={data} isLoading={isLoading} />;
};

export default InfoZone;
