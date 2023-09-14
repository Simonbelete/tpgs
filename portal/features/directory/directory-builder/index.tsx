import React, { useState } from "react";
import { Paper, Grid, Typography, Box, Button, Stack, Divider, ListItem, Chip } from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { clearAll, removeDirectoryById, addDirectory } from "../slices";
import DirectorySelectDialog from '../directory-select-dialog'
import { Directory } from "@/models";

const DirectoryBuilder = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const state = useSelector((state: RootState) => state.directoryBuilder);

  const handleDirectoryRemove = (data: any) => () => dispatch(removeDirectoryById(data.id));
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleSelected = (value?: Directory) => {
    if(value !== undefined || value !== null) {
      dispatch(addDirectory(value as Directory));
    }

    handleClose();
  }

  return (
    <>
    <DirectorySelectDialog 
      open={isOpen}
      onSelected={handleSelected}
      onClose={handleClose}
    />
    <Paper sx={{ p: 1 }} elevation={0} variant="outlined" square>
      <Grid container alignItems={"center"}>
        <Grid item xs={12} md={4}>
          <Typography variant="body2" fontWeight={700}>
            Directories
          </Typography>
        </Grid>
        <Grid item xs={12} md />
        <Grid item xs={12} md={4}>
        <Stack
            direction="row"
            justifyContent={{ xs: "start", md: "end" }}
            spacing={2}
          >
          <Box>
            <Button onClick={handleOpen} variant="outlined" size={"small"} startIcon={<AddIcon />}>
              Add
            </Button>
            </Box>
          </Stack>
        </Grid>
      <Divider sx={{ my: 1 }} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack>
              {state.directories.map((e, key) => 
                <ListItem key={key}>
                  <Chip
                    label={e.name}
                    size="small"
                    onDelete={handleDirectoryRemove(e)}
                  />
                </ListItem>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  </>
  )
}

export default DirectoryBuilder;