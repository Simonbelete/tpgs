import { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { useRefreshDirectoryMutation } from '../services';

const RefreshDirectoryButton = () => {

  const [refreshDirectory, { isLoading }] = useRefreshDirectoryMutation();

  const handleRefresh = async () => await refreshDirectory(null);

  return (
    <LoadingButton 
      loadingIndicator="Loading…"
      variant="outlined"
      loading={isLoading} onClick={handleRefresh} startIcon={<AutorenewIcon />}>Refresh Directory</LoadingButton>
  )
}

export default RefreshDirectoryButton;