import React, { useEffect } from "react";
import * as yup from "yup";
import { Ingredient, Requirement, RequirementIngredient } from "@/models";
import { CancelIcon, CreateNewIcon, FormLayout, HistoryIcon } from "@/lib/crud";
import { requirementIngredientApi } from "../services";
import { requirementApi } from "@/features/requirements/services";
import { IngredientForm } from "@/features/ingredients";
import { ingredientApi } from "@/features/ingredients/services";

const schema = yup.object({
  requirement: yup.object().required(),
  ingredient: yup.object().required(),
  min: yup.number().min(0).required(),
  max: yup.number().min(0).required(),
});

export const RequirementIngredientForm = ({
  data,
  shallowRoute = true,
}: {
  data?: RequirementIngredient;
  shallowRoute?: boolean;
}) => {
  return (
    <>
      <FormLayout<RequirementIngredient>
        title="Requirement Min & Max"
        id={data?.id || 0}
        data={data}
        schema={schema}
        shallowRoute={shallowRoute}
        createEndpoint={
          requirementIngredientApi.endpoints.createRequirementIngredient
        }
        updateEndpoint={
          requirementIngredientApi.endpoints.updateRequirementIngredient
        }
        deleteEndpoint={
          requirementIngredientApi.endpoints.deleteRequirementIngredient
        }
        summaryEndpoint={
          requirementIngredientApi.endpoints.getRequirementIngredientSummary
        }
        beforeSubmit={(values: Partial<RequirementIngredient>) => {
          const cleaned_data: Partial<RequirementIngredient> = {
            id: values.id,
            requirement: (values.requirement as Requirement).id || 0,
            ingredient: (values.ingredient as Ingredient).id || 0,
            min: values.min,
            max: values.max,
          };

          return cleaned_data;
        }}
        fields={{
          requirement: {
            label: "Requirement",
            placeholder: "Requirement",
            endpoint: requirementApi.endpoints.getRequirements,
            xs: 12,
            md: 12,
          },
          ingredient: {
            label: "Ingredient",
            placeholder: "Ingredient",
            endpoint: ingredientApi.endpoints.getIngredients,
            xs: 12,
            md: 12,
            form: <IngredientForm shallowRoute={shallowRoute} />,
          },
          min: { label: "Min", placeholder: "Min", xs: 12, md: 6 },
          max: { label: "Min", placeholder: "Min", xs: 12, md: 6 },
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
