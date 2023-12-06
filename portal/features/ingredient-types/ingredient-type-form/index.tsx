import React, { useEffect } from "react";
import * as yup from "yup";
import { IngredientType } from "@/models";
import { CancelIcon, CreateNewIcon, FormLayout, HistoryIcon } from "@/lib/crud";
import { ingredientTypeApi } from "../services";

const schema = yup.object({
  name: yup.string().required(),
});

export const IngredientTypeForm = ({
  data,
  shallowRoute = true,
}: {
  data?: IngredientType;
  shallowRoute?: boolean;
}) => {
  return (
    <>
      <FormLayout<IngredientType>
        title="Ingredient Group"
        id={data?.id || 0}
        data={data}
        schema={schema}
        shallowRoute={shallowRoute}
        createEndpoint={ingredientTypeApi.endpoints.createIngredientType}
        updateEndpoint={ingredientTypeApi.endpoints.updateIngredientType}
        deleteEndpoint={ingredientTypeApi.endpoints.deleteIngredientType}
        summaryEndpoint={ingredientTypeApi.endpoints.getIngredientTypeSummary}
        beforeSubmit={(values: Partial<IngredientType>) => {
          const cleaned_data: Partial<IngredientType> = {
            id: values.id,
            name: values.name,
          };

          return cleaned_data;
        }}
        fields={{
          name: { label: "Name", placeholder: "Name", xs: 12, md: 12 },
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
