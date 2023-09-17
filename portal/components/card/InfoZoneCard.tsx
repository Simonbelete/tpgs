import React from 'react';
import { Card, 
  CardContent, CardHeader, 
  CardHeaderProps, Divider, 
  Typography,
  Grid,
  Stack
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import EventNoteIcon from '@mui/icons-material/EventNote';
import Link from 'next/link';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import DrawIcon from '@mui/icons-material/Draw';
import HistoryIcon from '@mui/icons-material/History';

const InfoZoneCardCard =  ({
}: {
}) => {
  return (
    <Card sx={{px: 2, py: 2, boxShadow: "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px", background: "#fff", borderRadius: "6px" }}>
        <Stack spacing={2}>
          <Stack direction={"row"} spacing={2}>
            <EventNoteIcon fontSize='small' />
            <Typography variant="h3" component="h3" gutterBottom={true}>
              <Typography sx={{mb: 0.5}} fontWeight={400} variant='body2' color="text.light">Date Created</Typography>
              <Typography variant='body2' fontWeight={600} color="text.primary">10 Jun 2023</Typography>
            </Typography>
          </Stack>

          <Stack direction={"row"} spacing={2}>
            <AccountCircleIcon fontSize='small' />
            <Typography variant="h3" component="h3" gutterBottom={true}>
              <Typography sx={{mb: 0.5}} fontWeight={400} variant='body2' color="text.light">Created by</Typography>
              <Typography variant='body2' fontWeight={600} color="text.primary">
                <Link href="/user/1">
                  Admin
                </Link>
              </Typography>
            </Typography>
          </Stack>

          <Stack direction={"row"} spacing={2}>
            <EventRepeatIcon fontSize='small' />
            <Typography variant="h3" component="h3" gutterBottom={true}>
              <Typography sx={{mb: 0.5}} fontWeight={400} variant='body2' color="text.light">Last updated</Typography>
              <Typography variant='body2' fontWeight={600} color="text.primary">
                10 Jun 2023
              </Typography>
            </Typography>
          </Stack>

          <Stack direction={"row"} spacing={2}>
            <DrawIcon fontSize='small' />
            <Typography variant="h3" component="h3" gutterBottom={true}>
              <Typography sx={{mb: 0.5}} fontWeight={400} variant='body2' color="text.light">Last Updated by</Typography>
              <Typography variant='body2' fontWeight={600} color="text.primary">
                <Link href="/user/1">
                  Admin
                </Link>
              </Typography>
            </Typography>
          </Stack>

          <Stack direction={"row"} spacing={2}>
            <HistoryIcon fontSize='small' />
            <Typography variant="h3" component="h3" gutterBottom={true}>
              <Typography sx={{mb: 0.5}} fontWeight={400} variant='body2' color="text.light">Histories</Typography>
              <Typography variant='body2' fontWeight={600} color="text.primary">
                10 Changes
              </Typography>
            </Typography>
          </Stack>

        </Stack>
    </Card>
  )
}

export default InfoZoneCardCard;