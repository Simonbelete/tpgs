import { DangerZoneCard } from '@/components';
import React, { useState } from 'react';
import { useUpdatePurposeMutation, useDeletePurposeMutation } from '../services';
import { useRouter } from 'next/router';
import { useCRUD } from "@/hooks";

const BreedDangerZone = ({ id, is_active }: { id: number, is_active: boolean }) => {
  const router = useRouter();
  const [updateBreed, updateResult ] = useUpdatePurposeMutation();
  const [deleteBreed, deleteResult ] = useDeletePurposeMutation();

  const handleToggleActive = async (value: boolean) =>  await updateBreed({id: id, is_active: value})
  const handleDelete = async () => await deleteBreed(id).then(() => router.push('/purposes'))

  const useCRUDHook = useCRUD({
    results: [
      updateResult
    ],
  });

  return (
    <DangerZoneCard 
      onViewHistories={() => router.push(`/purposes/${id}/histories`)} 
      onDeactivate={() => handleToggleActive(false)}
      onActivate={() => handleToggleActive(true)}
      onDelete={handleDelete}
      isUpdating={updateResult.isLoading}
      isDeleting={deleteResult.isLoading}
      is_active={updateResult.data == undefined ? is_active : updateResult.data.is_active }
    />
  )
}

export default BreedDangerZone;