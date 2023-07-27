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
import { useSelector, useDispatch } from "react-redux";
import { setRequirements } from "../slices";
import { RootState } from "@/store";

function a11yProps(index: number) {
  return {
    id: `formula-form-${index}`,
    "aria-controls": `formula-form-${index}`,
  };
}

const FormulaForm = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [requirementNutrients, setRequirementNutrients] = useState<Nutrient[]>(
    []
  );
  const [openIngredientModal, setOpenIngredientModal] = useState(false);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
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

  // States
  const formula = useSelector((state: RootState) => state.formula);

  const handleOnFormulate = () => {
    console.log(formula);
  };

  return (
    <>
      <Box sx={{ mb: 5 }}>
        <Paper sx={{ p: 2 }} elevation={0} variant="outlined" square>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              size="small"
              disableElevation
              onClick={handleOnFormulate}
            >
              Formulate
            </Button>
          </Stack>
        </Paper>
      </Box>

      <IngredientSelectDialog
        open={openIngredientModal}
        onSelected={handleIngredientSelected}
        onClose={handleCloseIngredientModal}
      />
      {/* <Paper> */}
      <Tabs value={tabIndex} onChange={handleChange}>
        <Tab label="Ingredients" {...a11yProps(0)} />
        <Tab label="Requirements" {...a11yProps(0)} />
      </Tabs>
      <Box mx={2} my={4} pb={4}>
        {tabIndex == 0 && (
          <Box>
            <Button onClick={handleOpenIngredientModal}>Add Ingredient</Button>
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
        {tabIndex == 1 && <NutrientEditableTable setter={setRequirements} />}
      </Box>
      {/* </Paper> */}
    </>
  );
};

export default FormulaForm;
