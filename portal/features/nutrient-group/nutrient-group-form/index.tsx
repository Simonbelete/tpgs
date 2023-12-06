import React, { useEffect } from "react";
import * as yup from "yup";
import { NutrientGroup } from "@/models";
import { CancelIcon, CreateNewIcon, FormLayout, HistoryIcon } from "@/lib/crud";
import { nutrientGroupApi } from "../services";

const schema = yup.object({
  name: yup.string().required(),
});

export const NutrientGroupForm = ({
  data,
  shallowRoute = true,
}: {
  data?: NutrientGroup;
  shallowRoute?: boolean;
}) => {
  return (
    <>
      <FormLayout<NutrientGroup>
        title="Nutrient Group"
        id={data?.id || 0}
        data={data}
        schema={schema}
        shallowRoute={shallowRoute}
        createEndpoint={nutrientGroupApi.endpoints.createNutrientGroup}
        updateEndpoint={nutrientGroupApi.endpoints.updateNutrientGroup}
        deleteEndpoint={nutrientGroupApi.endpoints.deleteNutrientGroup}
        summaryEndpoint={nutrientGroupApi.endpoints.getNutrientGroupSummary}
        beforeSubmit={(values: Partial<NutrientGroup>) => {
          const cleaned_data: Partial<NutrientGroup> = {
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
