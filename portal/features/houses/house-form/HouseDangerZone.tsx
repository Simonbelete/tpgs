import { DangerZoneCard } from '@/components';
import React from 'react';
import { useDeleteHouseMutation, useUpdateHouseMutation } from '../services';
import { useRouter } from 'next/router';

const HouseDangerZone = ({ id, is_active }: { id: number, is_active: boolean }) => {
  const router = useRouter();
  const [updateHouse, { isLoading: isUpdating } ] = useUpdateHouseMutation();
  const [deleteHouse, { isLoading: isDeleting }] = useDeleteHouseMutation();

  const handleToggleActive = async (value: boolean) => {
    console.log('999999')
    console.log(value)
    try{
      await updateHouse({id: id, data: {is_active: value}}) 
    }catch(ex){
      console.log('00000')
      console.log(ex)
    }
  }

  return (
    <DangerZoneCard 
      onViewHistories={() => router.push(`/houses/${id}/histories`)} 
      onDeactivate={() => handleToggleActive(false)}
      onActivate={() => handleToggleActive(true)}
      onDelete={() => deleteHouse(id).then(() => router.push('/houses'))}
      isUpdating={isUpdating}
      isDeleting={isDeleting}
      is_active={is_active}
    />
  )
}

export default HouseDangerZone;