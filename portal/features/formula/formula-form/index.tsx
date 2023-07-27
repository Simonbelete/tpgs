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
  OutlinedInput,
  TextField,
  InputAdornment,
  Stack,
} from "@mui/material";
import {
  NutrientEditableTable,
  NutrientListItem,
  NutrientSelectDialog,
} from "@/features/nutrients";
import { IngredientSelectDialog } from "@/features/ingredients";
import { Ingredient, Nutrient, Unit } from "@/models";
import ClearIcon from "@mui/icons-material/Clear";
import { BootstrapInput } from "@/components/inputs";
import { DataTable } from "@/components/tables";

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
  const [openIngredientModal, setOpenIngredientModal] = useState(false);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

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

  const handleOpenIngredientModal = () => setOpenIngredientModal(true);
  const handleCloseIngredientModal = () => setOpenIngredientModal(false);
  const handleIngredientSelected = (newValue: Ingredient) => {
    handleCloseIngredientModal();
    const newIng: Ingredient[] = _.concat(ingredients, newValue);
    setIngredients(newIng);
  };

  const handleRemoveNutrients = (id: number) => {
    const newReq = [...requirementNutrients];
    _.remove(newReq, (n) => n.id == id);
    setRequirementNutrients(newReq);
  };

  return (
    <>
      <Box sx={{ mb: 5 }}>
        <Paper sx={{ p: 2 }} elevation={0} variant="outlined" square>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" size="small" disableElevation>
              Formulate
            </Button>
          </Stack>
        </Paper>
      </Box>

      <NutrientEditableTable />
      <br />
      <br />

      <NutrientSelectDialog
        open={openNutrientModal}
        onSelected={handleNutrientSelected}
        onClose={handleCloseNutrientModal}
      />
      <IngredientSelectDialog
        open={openIngredientModal}
        onSelected={handleIngredientSelected}
        onClose={handleCloseIngredientModal}
      />
      <Paper>
        <Tabs value={tabIndex} onChange={handleChange}>
          <Tab label="Ingredients" {...a11yProps(0)} />
          <Tab label="Requirements" {...a11yProps(0)} />
        </Tabs>
        <Box mx={2} my={4} pb={4}>
          {tabIndex == 0 && (
            <Box>
              <Button onClick={handleOpenIngredientModal}>
                Add Ingredient
              </Button>
              <Box>
                {ingredients &&
                  ingredients.map((e, key) => (
                    <Stack key={key}>
                      <Typography>{e.name}</Typography>
                      <Tooltip title="Remove">
                        <IconButton onClick={() => handleRemoveNutrients(e.id)}>
                          <ClearIcon />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  ))}
              </Box>
            </Box>
          )}
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
                      <TextField
                        variant="standard"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              {e.unit != null ? (e.unit as Unit).name : ""}
                            </InputAdornment>
                          ),
                        }}
                      />
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
