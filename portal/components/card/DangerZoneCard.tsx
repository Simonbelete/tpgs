import React from 'react';
import { Card, 
  CardContent, CardHeader, 
  CardHeaderProps, Divider, 
  Typography,
  Grid,
  Stack,
  useTheme,
  Button
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import EventNoteIcon from '@mui/icons-material/EventNote';

const DangerZoneCard =  ({
}: {
}) => {
  const theme = useTheme();

  return (
    <Card sx={{px: 2, py: 2, 
      boxShadow: "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px", 
      background: "#fff", borderRadius: "6px",
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: theme.palette.error.main
      }}>
        <Stack>
         <Button size="small">Deactivate</Button>
        </Stack>
    </Card>
  )
}

export default DangerZoneCard;