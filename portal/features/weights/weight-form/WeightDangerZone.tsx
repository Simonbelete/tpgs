import { DangerZoneCard } from '@/components';
import React, { useState } from 'react';
import { useDeleteWeightMutation, useUpdateWeightMutation } from '../services';
import { useRouter } from 'next/router';
import { useCRUD } from "@/hooks";

const WeightDangerZone = ({ id, is_active }: { id: number, is_active: boolean }) => {
  const router = useRouter();
  const [updateWeight, updateResult ] = useUpdateWeightMutation();
  const [deleteWeight, deleteResult ] = useDeleteWeightMutation();

  const handleToggleActive = async (value: boolean) =>  await updateWeight({id: id, is_active: value})
  const handleDelete = async () => await deleteWeight(id).then(() => router.push('/eggs'))

  const useCRUDHook = useCRUD({
    results: [
      updateResult
    ],
  });

  return (
    <DangerZoneCard 
      onViewHistories={() => router.push(`/eggs/${id}/histories`)} 
      onDeactivate={() => handleToggleActive(false)}
      onActivate={() => handleToggleActive(true)}
      onDelete={handleDelete}
      isUpdating={updateResult.isLoading}
      isDeleting={deleteResult.isLoading}
      is_active={updateResult.data == undefined ? is_active : updateResult.data.is_active }
    />
  )
}

export default WeightDangerZone;