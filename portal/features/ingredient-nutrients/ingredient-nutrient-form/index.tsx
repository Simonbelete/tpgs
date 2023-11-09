import React, { useEffect } from "react";
import * as yup from "yup";
import { Ingredient, IngredientNutrient, Nutrient } from "@/models";
import { CancelIcon, CreateNewIcon, FormLayout, HistoryIcon } from "@/lib/crud";
import { ingredientNutrientApi } from "../services";
import { ingredientApi } from "@/features/ingredients/services";
import { IngredientForm } from "@/features/ingredients";
import { nutrientApi } from "@/features/nutrients/services";
import { NutrientForm } from "@/features/nutrients";

const schema = yup.object({
  name: yup.string().required(),
  house: yup.object().required(),
});

export const IngredientNutrientForm = ({
  data,
  shallowRoute = true,
}: {
  data?: IngredientNutrient;
  shallowRoute?: boolean;
}) => {
  return (
    <>
      <FormLayout<IngredientNutrient>
        title="Ingredient Nutrient Form"
        id={data?.id || 0}
        data={data}
        schema={schema}
        shallowRoute={shallowRoute}
        createEndpoint={
          ingredientNutrientApi.endpoints.createIngredientNutrient
        }
        updateEndpoint={
          ingredientNutrientApi.endpoints.updateIngredientNutrient
        }
        deleteEndpoint={
          ingredientNutrientApi.endpoints.deleteIngredientNutrient
        }
        summaryEndpoint={
          ingredientNutrientApi.endpoints.getIngredientNutrientSummary
        }
        beforeSubmit={(values: Partial<IngredientNutrient>) => {
          const cleaned_data: Partial<IngredientNutrient> = {
            id: values.id,
            value: values.value,
            ingredient: (values.ingredient as Ingredient).id || 0,
            nutrient: (values.nutrient as Nutrient).id || 0,
          };

          return cleaned_data;
        }}
        fields={{
          ingredient: {
            label: "Ingredient",
            placeholder: "Ingredient",
            endpoint: ingredientApi.endpoints.getIngredients,
            form: <IngredientForm shallowRoute={false} />,
            xs: 12,
            md: 12,
          },
          nutrient: {
            label: "Nutrient",
            placeholder: "Nutrient",
            endpoint: ingredientApi.endpoints.getIngredients,
            form: <NutrientForm shallowRoute={false} />,
            xs: 12,
            md: 12,
          },
          value: { label: "Value", placeholder: "Value", xs: 12, md: 12 },
        }}
        menus={
          <>
            <CreateNewIcon />
            <HistoryIcon />
            <CancelIcon />
          </>
        }
      />
    </>
  );
};
