import { DangerZoneCard } from "@/components";
import React, { useState } from "react";
import {
  useDeleteIngredientTypeMutation,
  useUpdateIngredientTypeMutation,
} from "../services";
import { useRouter } from "next/router";
import { useCRUD } from "@/hooks";

const IngredientTypeDangerZone = ({
  id,
  is_active,
}: {
  id: number;
  is_active: boolean;
}) => {
  const router = useRouter();
  const [updateIngredientType, updateResult] =
    useUpdateIngredientTypeMutation();
  const [deleteIngredientType, deleteResult] =
    useDeleteIngredientTypeMutation();

  const handleToggleActive = async (value: boolean) =>
    await updateIngredientType({ id: id, is_active: value });
  const handleDelete = async () =>
    await deleteIngredientType(id).then(() => router.push("/houses"));

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

export default IngredientTypeDangerZone;
