import { DangerZoneCard } from "@/components";
import React from "react";
import { useRouter } from "next/router";
import { useCRUD } from "@/hooks";
import { ApiEndpointMutation } from "@reduxjs/toolkit/dist/query/core/module";
import { MutationDefinition } from "@reduxjs/toolkit/dist/query";
import { EndpointDefinitions } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { MutationHooks } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { ClientQueyFn, Query } from "@/types";
import { AbstractBaseModel } from "@/models";
import _ from "lodash";

export interface DangerZoneProps<T> {
  id: number;
  is_active?: boolean;
  updateEndpoint: ApiEndpointMutation<
    MutationDefinition<
      Pick<AbstractBaseModel, "id"> & Partial<T>,
      ClientQueyFn,
      any,
      Promise<T>,
      any
    >,
    EndpointDefinitions
  > &
    MutationHooks<
      MutationDefinition<
        Pick<AbstractBaseModel, "id"> & Partial<T>,
        ClientQueyFn,
        any,
        Promise<T>,
        any
      >
    >;
  deleteEndpoint: ApiEndpointMutation<
    MutationDefinition<number, ClientQueyFn, any, T, any>,
    EndpointDefinitions
  > &
    MutationHooks<MutationDefinition<number, ClientQueyFn, any, T, any>>;
  children?: React.ReactNode;
}

export default function DangerZone<T>({
  id,
  is_active,
  updateEndpoint,
  deleteEndpoint,
  children,
}: DangerZoneProps<T>) {
  const router = useRouter();
  const [updateTrigger, updateResult] = updateEndpoint.useMutation();
  const [deleteTrigger, deleteResult] = deleteEndpoint.useMutation();

  const handleToggleActive = async (value: boolean) =>
    await updateTrigger({ id: id, is_active: value } as any);
  const handleDelete = async () =>
    id &&
    (await deleteTrigger(id).then(() =>
      router.push(router.pathname.split("/[id]")[0])
    ));

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
        // @ts-ignore
        updateResult.data == undefined ? is_active : updateResult.data.is_active
      }
    >
      {children}
    </DangerZoneCard>
  );
}
