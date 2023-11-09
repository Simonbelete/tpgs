import React, { useEffect } from "react";
import * as yup from "yup";
import { Nutrient, Requirement, RequirementNutrient } from "@/models";
import { CancelIcon, CreateNewIcon, FormLayout, HistoryIcon } from "@/lib/crud";
import { requirementNutrientApi } from "../services";
import { requirementApi } from "@/features/requirements/services";
import { nutrientApi } from "@/features/nutrients/services";
import { NutrientForm } from "@/features/nutrients";

const schema = yup.object({
  name: yup.string().required(),
  house: yup.object().required(),
});

export const RequirementNutrientForm = ({
  data,
  shallowRoute = true,
}: {
  data?: RequirementNutrient;
  shallowRoute?: boolean;
}) => {
  return (
    <>
      <FormLayout<RequirementNutrient>
        title="RequirementNutrient Form"
        id={data?.id || 0}
        data={data}
        schema={schema}
        shallowRoute={shallowRoute}
        createEndpoint={
          requirementNutrientApi.endpoints.createRequirementNutrient
        }
        updateEndpoint={
          requirementNutrientApi.endpoints.updateRequirementNutrient
        }
        deleteEndpoint={
          requirementNutrientApi.endpoints.deleteRequirementNutrient
        }
        summaryEndpoint={
          requirementNutrientApi.endpoints.getRequirementNutrientSummary
        }
        beforeSubmit={(values: Partial<RequirementNutrient>) => {
          const cleaned_data: Partial<RequirementNutrient> = {
            id: values.id,
            requirement: (values.requirement as Requirement).id || 0,
            nutrient: (values.nutrient as Nutrient).id || 0,
            value: values.value,
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
          nutrient: {
            label: "Nutrient",
            placeholder: "Nutrient",
            endpoint: nutrientApi.endpoints.getNutrients,
            xs: 12,
            md: 12,
            form: <NutrientForm shallowRoute={shallowRoute} />,
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
