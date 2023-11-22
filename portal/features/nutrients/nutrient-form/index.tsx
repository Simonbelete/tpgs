import React, { useEffect } from "react";
import * as yup from "yup";
import { House, Nutrient, NutrientGroup, Unit } from "@/models";
import { CancelIcon, CreateNewIcon, FormLayout, HistoryIcon } from "@/lib/crud";
import { nutrientApi } from "../services";
import { nutrientGroupApi } from "@/features/nutrient-group/services";
import { NutrientGroupForm } from "@/features/nutrient-group";
import { unitApi } from "@/features/units/services";
import { UnitForm } from "@/features/units";
import _ from "lodash";

const schema = yup.object({
  name: yup.string().required(),
  code: yup.string().nullable(),
  abbreviation: yup.string().required(),
  description: yup.string().nullable(),
  nutrient_group: yup.object().nullable(),
  unit: yup.object(),
});

export const NutrientForm = ({
  data,
  shallowRoute = true,
}: {
  data?: Nutrient;
  shallowRoute?: boolean;
}) => {
  return (
    <>
      <FormLayout<Nutrient>
        title="Nutrient Form"
        id={data?.id || 0}
        data={data}
        schema={schema}
        shallowRoute={shallowRoute}
        createEndpoint={nutrientApi.endpoints.createNutrient}
        updateEndpoint={nutrientApi.endpoints.updateNutrient}
        deleteEndpoint={nutrientApi.endpoints.deleteNutrient}
        summaryEndpoint={nutrientApi.endpoints.getNutrientSummary}
        beforeSubmit={(values: Partial<Nutrient>) => {
          const cleaned_data: Partial<Nutrient> = {
            id: values.id,
            name: values.name,
            abbreviation: values.abbreviation,
            order: values.order,
            nutrient_group: _.get(values.nutrient_group, "id", null),
            unit: _.get(values.unit, "id", null),
          };

          return cleaned_data;
        }}
        fields={{
          name: { label: "Name", placeholder: "Name", xs: 12, md: 6 },
          // code: { label: "Code", placeholder: "Code", xs: 12, md: 6 },
          abbreviation: {
            label: "Abbreviation",
            placeholder: "Abbreviation",
            xs: 12,
            md: 6,
          },
          nutrient_group: {
            label: "Nutrient Group",
            placeholder: "Nutrient Group",
            endpoint: nutrientGroupApi.endpoints.getNutrientGroups,
            form: <NutrientGroupForm shallowRoute={false} />,
            xs: 12,
            md: 6,
          },
          unit: {
            label: "Unit",
            placeholder: "Unit",
            endpoint: unitApi.endpoints.getUnits,
            form: <UnitForm shallowRoute={false} />,
            xs: 12,
            md: 6,
          },
          description: {
            label: "Description",
            placeholder: "Description",
            xs: 12,
            md: 6,
          },
          order: {
            label: "Order",
            placeholder: "Order",
            xs: 12,
            md: 6,
            type: "number",
          },
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
