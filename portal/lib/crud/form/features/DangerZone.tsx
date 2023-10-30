import { DangerZoneCard } from "@/components";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useCRUD } from "@/hooks";
import { ApiEndpointMutation } from "@reduxjs/toolkit/dist/query/core/module";
import { MutationDefinition } from "@reduxjs/toolkit/dist/query";
import { EndpointDefinitions } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import {
  MutationHooks,
  QueryHooks,
} from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { ClientQueyFn, Query } from "@/types";
import { Response, AbstractBaseModel } from "@/models";
import { AxiosResponse } from "axios";

export interface DangerZoneProps<T> {
  id: number;
  is_active?: boolean;
  updateEndpoint: ApiEndpointMutation<
    MutationDefinition<
      Pick<AbstractBaseModel, "id"> & Partial<T>,
      ClientQueyFn,
      any,
      Promise<AxiosResponse<T>>,
      any
    >,
    EndpointDefinitions
  > &
    MutationHooks<
      MutationDefinition<
        Pick<AbstractBaseModel, "id"> & Partial<T>,
        ClientQueyFn,
        any,
        Promise<AxiosResponse<T>>,
        any
      >
    >;
  deleteEndpoint: ApiEndpointMutation<
    MutationDefinition<number, ClientQueyFn, any, T, any>,
    EndpointDefinitions
  > &
    MutationHooks<MutationDefinition<number, ClientQueyFn, any, T, any>>;
}

export default function DangerZone<T>({
  id,
  is_active,
  updateEndpoint,
  deleteEndpoint,
}: DangerZoneProps<T>) {
  const router = useRouter();
  const [updateTrigger, updateResult] = updateEndpoint.useMutation();
  const [deleteTrigger, deleteResult] = deleteEndpoint.useMutation();

  const handleToggleActive = async (value: boolean) =>
    await updateTrigger({ id: id, is_active: value } as any);
  const handleDelete = async () =>
    id && (await deleteTrigger(id).then(() => router.push("/houses")));

  const useCRUDHook = useCRUD({
    results: [updateResult, deleteTrigger],
  });

  return (
    <DangerZoneCard
      onViewHistories={() => router.push(`${router.pathname}/histories`)}
      onDeactivate={() => handleToggleActive(false)}
      onActivate={() => handleToggleActive(true)}
      onDelete={handleDelete}
      isUpdating={updateResult.isLoading}
      isDeleting={deleteResult.isLoading}
      is_active={
        updateResult.data == undefined ? is_active : updateResult.data.is_active
      }
    />
  );
}
