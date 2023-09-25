import { DangerZoneCard } from '@/components';
import React, { useState } from 'react';
import { useDeleteFlockMutation, useUpdateFlockMutation } from '../services';
import { useRouter } from 'next/router';
import { useCRUD } from "@/hooks";

const FlockDangerZone = ({ id, is_active }: { id: number, is_active: boolean }) => {
  const router = useRouter();
  const [updateFlock, updateResult ] = useUpdateFlockMutation();
  const [deleteFlock, deleteResult ] = useDeleteFlockMutation();

  const handleToggleActive = async (value: boolean) =>  await updateFlock({id: id, is_active: value})
  const handleDelete = async () => await deleteFlock(id).then(() => router.push('/Flocks'))

  const useCRUDHook = useCRUD({
    results: [
      updateResult
    ],
  });

  return (
    <DangerZoneCard 
      onViewHistories={() => router.push(`/flocks/${id}/histories`)} 
      onDeactivate={() => handleToggleActive(false)}
      onActivate={() => handleToggleActive(true)}
      onDelete={handleDelete}
      isUpdating={updateResult.isLoading}
      isDeleting={deleteResult.isLoading}
      is_active={updateResult.data == undefined ? is_active : updateResult.data.is_active }
    />
  )
}

export default FlockDangerZone;