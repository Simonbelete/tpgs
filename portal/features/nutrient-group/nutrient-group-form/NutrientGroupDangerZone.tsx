import { DangerZoneCard } from "@/components";
import React, { useState } from "react";
import {
  useDeleteNutrientGroupMutation,
  useUpdateNutrientGroupMutation,
} from "../services";
import { useRouter } from "next/router";
import { useCRUD } from "@/hooks";

const NutrientGroupDangerZone = ({
  id,
  is_active,
}: {
  id: number;
  is_active: boolean;
}) => {
  const router = useRouter();
  const [updateNutrientGroup, updateResult] = useUpdateNutrientGroupMutation();
  const [deleteNutrientGroup, deleteResult] = useDeleteNutrientGroupMutation();

  const handleToggleActive = async (value: boolean) =>
    await updateNutrientGroup({ id: id, is_active: value });
  const handleDelete = async () =>
    await deleteNutrientGroup(id).then(() => router.push("/nutrient-groups"));

  const useCRUDHook = useCRUD({
    results: [updateResult],
  });

  return (
    <DangerZoneCard
      onViewHistories={() => router.push(`/nutrient-groups/${id}/histories`)}
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
};

export default NutrientGroupDangerZone;
