import { DangerZoneCard } from "@/components";
import React, { useState } from "react";
import {} from "@mui/material";
import {
  useDeleteChickenMutation,
  useUpdateChickenMutation,
} from "../services";
import { useRouter } from "next/router";
import { useCRUD } from "@/hooks";
import ChickenReductionSelectDialog from "./ChickenReductionModal";
import { Chicken } from "@/models";

const ChickenDangerZone = ({ chicken }: { chicken: Chicken }) => {
  const router = useRouter();
  const [updateChicken, updateResult] = useUpdateChickenMutation();
  const [deleteChicken, deleteResult] = useDeleteChickenMutation();

  const handleToggleActive = async (value: boolean) =>
    await updateChicken({ id: chicken.id, is_active: value });
  const handleDelete = async () =>
    await deleteChicken(chicken.id).then(() => router.push("/chickens"));

  const useCRUDHook = useCRUD({
    results: [updateResult],
  });

  return (
    <DangerZoneCard
      onViewHistories={() => router.push(`/chickens/${chicken.id}/histories`)}
      onDeactivate={() => handleToggleActive(false)}
      onActivate={() => handleToggleActive(true)}
      onDelete={handleDelete}
      isUpdating={updateResult.isLoading}
      isDeleting={deleteResult.isLoading}
      is_active={
        updateResult.data == undefined
          ? chicken.is_active
          : updateResult.data.is_active
      }
    >
      <ChickenReductionSelectDialog chicken={chicken} />
    </DangerZoneCard>
  );
};

export default ChickenDangerZone;
