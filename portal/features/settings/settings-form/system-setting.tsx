import React from "react";
import { FormControlLabel, Grid, Switch, Box, Typography, Container, Paper } from "@mui/material";
import { useDispatch } from "react-redux";
import { toggleSuperUserMode } from '../slices';

const SystemSetting = () => {
  const dispatch = useDispatch();

  const handleSuperUserMode = () => {
    dispatch(toggleSuperUserMode());
  }

  return (
    <div role="tabpanel">
      <Box sx={{px: 5}}>
        <Box sx={{mb: 3}}>
          <Typography fontWeight={600} variant="h6">System Setting</Typography>
        </Box>
        
        <Box>
          <Paper sx={{p: 1}} elevation={1}>
          <FormControlLabel
            label="Super User"
            labelPlacement="start"
            control={<Switch onChange={handleSuperUserMode} />}
          />
          </Paper>
        </Box>
      </Box>
    </div>
  )
}

export default SystemSetting;