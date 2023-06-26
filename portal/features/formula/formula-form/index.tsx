import React, { useState } from "react";
import _ from "lodash";
import {
  Paper,
  Tabs,
  Box,
  Tab,
  Button,
  Grid,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import { NutrientListItem, NutrientSelectDialog } from "@/features/nutrients";
import { Nutrient } from "@/models";
import ClearIcon from "@mui/icons-material/Clear";

function a11yProps(index: number) {
  return {
    id: `formula-form-${index}`,
    "aria-controls": `formula-form-${index}`,
  };
}

const FormulaForm = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [openNutrientModal, setOpenNutrientModal] = useState(false);
  const [requirementNutrients, setRequirementNutrients] = useState<Nutrient[]>(
    []
  );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleOpenNutrientModal = () => setOpenNutrientModal(true);
  const handleCloseNutrientModal = () => setOpenNutrientModal(false);
  const handleNutrientSelected = (newValue: Nutrient) => {
    handleCloseNutrientModal();
    const newReq: Nutrient[] = _.concat(requirementNutrients, newValue);
    setRequirementNutrients(newReq);
  };

  const handleRemoveNutrients = (id: number) => {
    console.log(id);
    const newReq = [...requirementNutrients];
    _.remove(newReq, (n) => {
      console.log(n.id);
      return n.id == id;
    });
    setRequirementNutrients(newReq);
  };

  return (
    <>
      <NutrientSelectDialog
        open={openNutrientModal}
        onSelected={handleNutrientSelected}
        onClose={handleCloseNutrientModal}
      />
      <Paper>
        <Tabs value={tabIndex} onChange={handleChange}>
          <Tab label="Ingredients" {...a11yProps(0)} />
          <Tab label="Requirements" {...a11yProps(0)} />
        </Tabs>
        <Box mx={2} my={4} pb={4}>
          {tabIndex == 0 && <h1>1</h1>}
          {tabIndex == 1 && (
            <Box>
              <Button onClick={handleOpenNutrientModal}>Add Nutrient</Button>
              <Box>
                {requirementNutrients.map((e, key) => (
                  <Grid key={key} container spacing={2}>
                    <Grid item xs={3}>
                      <Typography variant="body1">
                        {e.name} {e.abbreviation}
                      </Typography>
                    </Grid>
                    <Grid item xs>
                      Value
                    </Grid>
                    <Grid item xs={1}>
                      <Tooltip title="Remove">
                        <IconButton onClick={() => handleRemoveNutrients(e.id)}>
                          <ClearIcon />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Paper>
    </>
  );
};

export default FormulaForm;
