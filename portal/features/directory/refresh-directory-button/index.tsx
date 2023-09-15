import { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import directory_services from '../services/directory_services';

const RefreshDirectoryButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleRefresh = async () => {
    try{
      setIsLoading(true);
      await directory_services.refresh();
    }catch(ex) {
      
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <LoadingButton 
      loadingIndicator="Loading…"
      variant="outlined"
      loading={isLoading} onClick={handleRefresh} startIcon={<AutorenewIcon />}>Refresh Directory</LoadingButton>
  )
}

export default RefreshDirectoryButton;