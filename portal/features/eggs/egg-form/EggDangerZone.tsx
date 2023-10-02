import { DangerZoneCard } from '@/components';
import React, { useState } from 'react';
import { useDeleteEggMutation, useUpdateEggMutation } from '../services';
import { useRouter } from 'next/router';
import { useCRUD } from "@/hooks";

const EggDangerZone = ({ id, is_active }: { id: number, is_active: boolean }) => {
  const router = useRouter();
  const [updateEgg, updateResult ] = useUpdateEggMutation();
  const [deleteEgg, deleteResult ] = useDeleteEggMutation();

  const handleToggleActive = async (value: boolean) =>  await updateEgg({id: id, is_active: value})
  const handleDelete = async () => await deleteEgg(id).then(() => router.push('/eggs'))

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

export default EggDangerZone;