import React, { useState } from "react";
import * as yup from "yup";
import { GridColDef, GridValidRowModel, GridRowsProp } from "@mui/x-data-grid";
import { Ingredient, IngredientNutrient, Nutrient } from "@/models";
import {
  TabFormLayout,
  CreateNewIcon,
  HistoryIcon,
  CancelIcon,
  Form,
  DashboardIcon,
  EditableList,
  EditToolbar,
} from "@/lib/crud";
import { Tabs, Tab, Box, tabsClasses, Chip, Button } from "@mui/material";
import { Card } from "@/components";
import { ingredientApi } from "../services";
import { nutrientApi } from "@/features/nutrients/services";
import { EditMode } from "@/types";
import { ingredientTypeApi } from "@/features/ingredient-types/services";
import { IngredientTypeForm } from "@/features/ingredient-types";
import _ from "lodash";

const schema = yup.object({
  name: yup.string().required(),
  code: yup.string().nullable(),
  ingredient_type: yup.object().nullable(),
  description: yup.string().nullable(),
  price: yup.number().min(0).nullable(),
  dm: yup.string().nullable(),
  min: yup.number().nullable(),
  max: yup.number().nullable(),
});

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export interface EditableIngredientNutrient
  extends IngredientNutrient,
    EditMode {}

const IngredientNutrientToolbar = ({
  setRows,
  rows,
  refetch,
}: {
  setRows: (
    newRows: (
      oldRows: GridRowsProp<EditableIngredientNutrient>
    ) => GridRowsProp<EditableIngredientNutrient>
  ) => void;
  rows: GridRowsProp<EditableIngredientNutrient>;
  refetch: () => void;
}) => {
  return (
    <EditToolbar<EditableIngredientNutrient, Nutrient>
      title="Add Nutrient"
      refetch={refetch}
      setRows={setRows}
      rows={rows}
      endpoint={nutrientApi.endpoints.getNutrients}
      mapperKey="nutrient"
    />
  );
};

export const IngredientForm = ({
  data,
  shallowRoute = true,
}: {
  data?: Ingredient;
  shallowRoute?: boolean;
}) => {
  const [formData, setFormData] = useState<Ingredient | undefined>(data);
  const [tab, setTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) =>
    setTab(newValue);

  const cleanData = (values: Partial<Ingredient>): Partial<Ingredient> => {
    return {
      name: values.name,
      code: values.code,
      ingredient_type: _.get(values, "ingredient_type.id", null),
      description: values.description,
      price: values.price,
      dm: values.dm,
      min: values.min,
      max: values.max,
    };
  };

  const cleanIngredientNutrient = (
    values: Partial<IngredientNutrient>
  ): Partial<IngredientNutrient> => {
    return {
      id: data?.id, // Only for post data
      ingredient: data?.id,
      nutrient: (values.nutrient as Nutrient).id || undefined,
      value: values.value,
    };
  };

  const handleCreated = (value: Ingredient) => {
    setFormData(value);
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 100,
      valueGetter: (params) =>
        params.row.nutrient ? params.row.nutrient.name : "",
    },
    {
      field: "abbreviation",
      headerName: "Abbreviation",
      flex: 1,
      minWidth: 150,
      valueGetter: (params) =>
        params.row.nutrient ? params.row.nutrient.abbreviation : "",
    },
    {
      field: "value",
      headerName: "Value",
      flex: 1,
      minWidth: 150,
      editable: true,
      type: "number",
    },
    {
      field: "unit",
      headerName: "Unit",
      flex: 1,
      minWidth: 150,
      valueGetter: (params) => _.get(params.row.nutrient, "unit.name", ""),
    },
  ];

  return (
    <>
      <TabFormLayout<Ingredient>
        id={formData?.id || 0}
        data={formData}
        title="Create Ingredient"
        updateEndpoint={ingredientApi.endpoints.updateIngredient}
        deleteEndpoint={ingredientApi.endpoints.deleteIngredient}
        summaryEndpoint={ingredientApi.endpoints.getIngredientSummary}
        menus={
          <>
            <DashboardIcon />
            <CreateNewIcon />
            <HistoryIcon />
            <CancelIcon />
          </>
        }
      >
        <Tabs
          scrollButtons
          value={tab}
          onChange={handleTabChange}
          aria-label="basic tabs example"
          sx={{
            [`& .${tabsClasses.scrollButtons}`]: {
              "&.Mui-disabled": { opacity: 0.3 },
            },
          }}
        >
          <Tab label="Detail" {...a11yProps(0)} />
          {formData && (
            <Tab
              label="Composition"
              iconPosition="end"
              icon={<Chip label={formData?.nutrient_count || 0} size="small" />}
              {...a11yProps(1)}
            />
          )}
        </Tabs>
        <Box sx={{ pt: 5 }}>
          {tab == 0 && (
            <Card title="Ingredient Detail">
              <Form
                shallowRoute={shallowRoute}
                data={formData}
                schema={schema}
                createEndpoint={ingredientApi.endpoints.createIngredient}
                updateEndpoint={ingredientApi.endpoints.updateIngredient}
                fields={{
                  name: { label: "Name", placeholder: "Name", xs: 12, md: 6 },
                  code: {
                    label: "Code",
                    placeholder: "Code",
                    xs: 12,
                    md: 6,
                  },
                  ingredient_type: {
                    label: "Ingredient Group",
                    placeholder: "Ingredient Group",
                    endpoint: ingredientTypeApi.endpoints.getIngredientTypes,
                    form: <IngredientTypeForm shallowRoute={false} />,
                  },
                  price: {
                    label: "Unit Price (kg)",
                    placeholder: "Unit Price (kg)",
                    xs: 12,
                    md: 6,
                    postfix: "kg",
                  },
                  dm: {
                    label: "Dry Matter (%)",
                    placeholder: "Dry Matter",
                    postfix: "%",
                    xs: 12,
                    md: 6,
                  },
                  description: {
                    label: "Description",
                    placeholder: "Description",
                  },
                  min: {
                    label: "Min (%)",
                    placeholder: "Min (%)",
                    postfix: "%",
                  },
                  max: {
                    label: "Max (%)",
                    placeholder: "Max (%)",
                    postfix: "%",
                  },
                }}
                beforeSubmit={cleanData}
                onCreateSuccess={handleCreated}
              />
            </Card>
          )}
          {formData && tab == 1 && (
            <EditableList<IngredientNutrient>
              getQuery={{ id: formData?.id, query: {} }}
              toolbar={IngredientNutrientToolbar}
              columns={columns}
              beforeSubmit={cleanIngredientNutrient}
              getEndpoint={ingredientApi.endpoints.getNutrientsOfIngredient}
              createEndpoint={
                ingredientApi.endpoints.createNutrientForIngredient
              }
              updateEndpoint={ingredientApi.endpoints.updateNutrietOfIngredient}
              deleteEndpoint={
                ingredientApi.endpoints.deleteNutrientOfIngredient
              }
            />
          )}
        </Box>
      </TabFormLayout>
    </>
  );
};
