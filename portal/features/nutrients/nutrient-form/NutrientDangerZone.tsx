import { DangerZoneCard } from '@/components';
import React, { useState } from 'react';
import { useDeleteNutrientMutation, useUpdateNutrientMutation } from '../services';
import { useRouter } from 'next/router';
import { useCRUD } from "@/hooks";

const NutrientDangerZone = ({ id, is_active }: { id: number, is_active: boolean }) => {
  const router = useRouter();
  const [updateNutrient, updateResult ] = useUpdateNutrientMutation();
  const [deleteNutrient, deleteResult ] = useDeleteNutrientMutation();

  const handleToggleActive = async (value: boolean) =>  await updateNutrient({id: id, is_active: value})
  const handleDelete = async () => await deleteNutrient(id).then(() => router.push('/houses'))

  const useCRUDHook = useCRUD({
    results: [
      updateResult
    ],
  });

  return (
    <DangerZoneCard 
      onViewHistories={() => router.push(`${router.pathname}/histories`)} 
      onDeactivate={() => handleToggleActive(false)}
      onActivate={() => handleToggleActive(true)}
      onDelete={handleDelete}
      isUpdating={updateResult.isLoading}
      isDeleting={deleteResult.isLoading}
      is_active={updateResult.data == undefined ? is_active : updateResult.data.is_active }
    />
  )
}

export default NutrientDangerZone;