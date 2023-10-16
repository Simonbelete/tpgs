import { DangerZoneCard } from "@/components";
import React, { useState } from "react";
import { useDeletePenMutation, useUpdatePenMutation } from "../services";
import { useRouter } from "next/router";
import { useCRUD } from "@/hooks";

const PenDangerZone = ({
  id,
  is_active,
}: {
  id: number;
  is_active: boolean;
}) => {
  const router = useRouter();
  const [updatePen, updateResult] = useUpdatePenMutation();
  const [deletePen, deleteResult] = useDeletePenMutation();

  const handleToggleActive = async (value: boolean) =>
    await updatePen({ id: id, is_active: value });
  const handleDelete = async () =>
    await deletePen(id).then(() => router.push("/houses"));

  const useCRUDHook = useCRUD({
    results: [updateResult],
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
};

export default PenDangerZone;
