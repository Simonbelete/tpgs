import React, { useEffect } from "react";
import * as yup from "yup";
import { Chicken, Weight } from "@/models";
import { CancelIcon, CreateNewIcon, FormLayout, HistoryIcon } from "@/lib/crud";
import { weightApi } from "../services";
import { chickenApi } from "@/features/chickens/services";
import { ChickenForm } from "@/features/chickens";

const schema = yup.object({
  chicken: yup.object().required("Chicken tag is required"),
  week: yup
    .number()
    .typeError("Week must be number")
    .min(0)
    .required("Week is required"),
  weight: yup.number().min(0).required("Body Weight is required"),
});

export const WeightForm = ({
  data,
  shallowRoute = true,
}: {
  data?: Weight;
  shallowRoute?: boolean;
}) => {
  return (
    <>
      <FormLayout<Weight>
        title="Body Weight"
        id={data?.id || 0}
        data={data}
        schema={schema}
        shallowRoute={shallowRoute}
        createEndpoint={weightApi.endpoints.createWeight}
        updateEndpoint={weightApi.endpoints.updateWeight}
        deleteEndpoint={weightApi.endpoints.deleteWeight}
        summaryEndpoint={weightApi.endpoints.getWeightSummary}
        beforeSubmit={(values: Partial<Weight>) => {
          const cleaned_data: Partial<Weight> = {
            id: values.id,
            week: values.week,
            weight: values.weight,
            chicken: (values.chicken as Chicken).id || 0,
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
            creatable: {
              field: "tag",
              endpoint: chickenApi.endpoints.createChicken,
            },
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
          weight: {
            label: "Body weight (g)",
            placeholder: "Body weight (g)",
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
