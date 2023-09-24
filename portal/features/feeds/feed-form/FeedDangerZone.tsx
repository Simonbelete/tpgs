import { DangerZoneCard } from '@/components';
import React, { useState } from 'react';
import { useDeleteFeedMutation, useUpdateFeedMutation } from '../services';
import { useRouter } from 'next/router';
import { useCRUD } from "@/hooks";

const FeedDangerZone = ({ id, is_active }: { id: number, is_active: boolean }) => {
  const router = useRouter();
  const [updateFeed, updateResult ] = useUpdateFeedMutation();
  const [deleteFeed, deleteResult ] = useDeleteFeedMutation();

  const handleToggleActive = async (value: boolean) =>  await updateFeed({id: id, is_active: value})
  const handleDelete = async () => await deleteFeed(id).then(() => router.push('/feeds'))

  const useCRUDHook = useCRUD({
    results: [
      updateResult
    ],
  });

  return (
    <DangerZoneCard 
      onViewHistories={() => router.push(`/feeds/${id}/histories`)} 
      onDeactivate={() => handleToggleActive(false)}
      onActivate={() => handleToggleActive(true)}
      onDelete={handleDelete}
      isUpdating={updateResult.isLoading}
      isDeleting={deleteResult.isLoading}
      is_active={updateResult.data == undefined ? is_active : updateResult.data.is_active }
    />
  )
}

export default FeedDangerZone;