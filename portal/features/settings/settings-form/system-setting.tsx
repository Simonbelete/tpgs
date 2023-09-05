import React from "react";
import { FormControlLabel, Grid, Switch, Box, Typography, Container, Paper, Divider, FormGroup, FormLabel } from "@mui/material";
import { useDispatch } from "react-redux";
import { toggleSuperUserMode } from '../slices';

const SystemSetting = () => {
  const dispatch = useDispatch();

  const handleSuperUserMode = () => {
    dispatch(toggleSuperUserMode());
  }

  return (
    <div role="tabpanel" style={{width: "100%"}}>
      <Box sx={{px: 5}}>
        <Box sx={{mb: 3}}>
          <Typography fontWeight={600} variant="h6" color="text.primary">System Setting</Typography>
          <Divider />
        </Box>
        
        <Box>
          <Paper sx={{p: 1}} elevation={0} square variant="outlined">
          <FormGroup row sx={{alignItems: "center", justifyContent: "space-between"}}>
            <FormLabel sx={{color: "#495056", fontSize: "16px", fontWeight: 500}}>Super User</FormLabel>
            <Switch onChange={handleSuperUserMode}/>
          </FormGroup>
          </Paper>
        </Box>
      </Box>
    </div>
  )
}

export default SystemSetting;