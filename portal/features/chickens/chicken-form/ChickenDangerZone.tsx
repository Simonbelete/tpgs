import { DangerZoneCard } from '@/components';
import React, { useState } from 'react';
import { useDeleteChickenMutation, useUpdateChickenMutation } from '../services';
import { useRouter } from 'next/router';
import { useCRUD } from "@/hooks";

const ChickenDangerZone = ({ id, is_active }: { id: number, is_active: boolean }) => {
  const router = useRouter();
  const [updateBreed, updateResult ] = useUpdateChickenMutation();
  const [deleteBreed, deleteResult ] = useDeleteChickenMutation();

  const handleToggleActive = async (value: boolean) =>  await updateBreed({id: id, is_active: value})
  const handleDelete = async () => await deleteBreed(id).then(() => router.push('/chickens'))

  const useCRUDHook = useCRUD({
    results: [
      updateResult
    ],
  });

  return (
    <DangerZoneCard 
      onViewHistories={() => router.push(`/chickens/${id}/histories`)} 
      onDeactivate={() => handleToggleActive(false)}
      onActivate={() => handleToggleActive(true)}
      onDelete={handleDelete}
      isUpdating={updateResult.isLoading}
      isDeleting={deleteResult.isLoading}
      is_active={updateResult.data == undefined ? is_active : updateResult.data.is_active }
    />
  )
}

export default ChickenDangerZone;