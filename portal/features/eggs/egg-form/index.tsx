import React, { useEffect } from "react";
import * as yup from "yup";
import { Egg, Chicken } from "@/models";
import { CancelIcon, CreateNewIcon, FormLayout, HistoryIcon } from "@/lib/crud";
import { eggApi } from "../services";
import { ChickenForm } from "@/features/chickens";
import { chickenApi } from "@/features/chickens/services";

const schema = yup.object({
  chicken: yup.object().required(),
  week: yup
    .number()
    .typeError("Week must be number")
    .min(0)
    .required("Week is required")
    .test(
      "is-age-in-given-week",
      "Given week is greater than the chicken's age",
      (value, context) => {
        const { chicken } = context.parent;

        if (chicken?.age_in_weeks == 0) return true;

        if (value > chicken?.age_in_weeks) return false;

        return true;
      }
    ),
  eggs: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .min(0)
    .required("Number of eggs is required"),
  weight: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .optional(),
});

export const EggForm = ({
  data,
  shallowRoute = true,
}: {
  data?: Egg;
  shallowRoute?: boolean;
}) => {
  return (
    <>
      <FormLayout<Egg>
        title="Egg production"
        id={data?.id || 0}
        data={data}
        schema={schema}
        shallowRoute={shallowRoute}
        createEndpoint={eggApi.endpoints.createEgg}
        updateEndpoint={eggApi.endpoints.updateEgg}
        deleteEndpoint={eggApi.endpoints.deleteEgg}
        summaryEndpoint={eggApi.endpoints.getEggSummary}
        beforeSubmit={(values: Partial<Egg>) => {
          const cleaned_data: Partial<Egg> = {
            id: values.id,
            week: values.week,
            weight: values.weight,
            chicken: (values.chicken as Chicken).id || 0,
            eggs: values.eggs,
          };

          return cleaned_data;
        }}
        fields={{
          chicken: {
            label: "Chicken",
            placeholder: "Chicken",
            endpoint: chickenApi.endpoints.getChickens,
            xs: 12,
            md: 12,
            dataKey: "display_name",
            viewForm: ChickenForm,
          },
          week: {
            label: "Week",
            placeholder: "Week",
            xs: 12,
            md: 12,
            type: "number",
            unresectable: true,
          },
          eggs: {
            label: "No of eggs",
            placeholder: "No of eggs",
            xs: 12,
            md: 12,
            type: "number",
          },
          weight: {
            label: "Total eggs weight (g)",
            placeholder: "Total eggs weight (g)",
            xs: 12,
            md: 12,
            postfix: "g",
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
