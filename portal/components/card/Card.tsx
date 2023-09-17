import React from 'react';
import { Card, 
  CardContent, CardHeader, 
  CardHeaderProps, Divider, 
  Typography,
  Grid
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const CardBasic =  ({
  children,
  title
}: {
  children: React.ReactNode,
  title?: string
}) => {
  return (
    <Card sx={{px: 2, pt: 1, pb: 2, boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px", background: "#fff", borderRadius: "6px" }}>
      <Grid container direction={"column"} spacing={1}>
        <Grid xs item>
          <Typography variant="body1" fontWeight={600} color="text.primary">
           {title}
          </Typography>
        </Grid>
        <Grid item xs>
         <Divider />
        </Grid>
      </Grid>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}

export default CardBasic;