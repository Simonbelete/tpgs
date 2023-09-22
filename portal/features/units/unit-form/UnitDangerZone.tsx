import { DangerZoneCard } from '@/components';
import React, { useState } from 'react';
import { useDeleteUnitMutation, useUpdateUnitMutation } from '../services';
import { useRouter } from 'next/router';
import { useCRUD } from "@/hooks";

const UnitDangerZone = ({ id, is_active }: { id: number, is_active: boolean }) => {
  const router = useRouter();
  const [updateBreed, updateResult ] = useUpdateUnitMutation();
  const [deleteBreed, deleteResult ] = useDeleteUnitMutation();

  const handleToggleActive = async (value: boolean) =>  await updateBreed({id: id, is_active: value})
  const handleDelete = async () => await deleteBreed(id).then(() => router.push('/units'))

  const useCRUDHook = useCRUD({
    results: [
      updateResult
    ],
  });

  return (
    <DangerZoneCard 
      onViewHistories={() => router.push(`/units/${id}/histories`)} 
      onDeactivate={() => handleToggleActive(false)}
      onActivate={() => handleToggleActive(true)}
      onDelete={handleDelete}
      isUpdating={updateResult.isLoading}
      isDeleting={deleteResult.isLoading}
      is_active={updateResult.data == undefined ? is_active : updateResult.data.is_active }
    />
  )
}

export default UnitDangerZone;