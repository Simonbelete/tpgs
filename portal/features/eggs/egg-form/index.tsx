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
    .required("Week is required"),
  weight: yup.number().required(),
  eggs: yup.number().required(),
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
        title="Egg Form"
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
            label: "chicken",
            placeholder: "Chicken",
            endpoint: chickenApi.endpoints.getChickens,
            form: <ChickenForm />,
            xs: 12,
            md: 12,
            dataKey: "display_name",
          },
          week: { label: "Week", placeholder: "Week", xs: 12, md: 12 },
          eggs: {
            label: "No of eggs",
            placeholder: "No of eggs",
            xs: 12,
            md: 12,
          },
          weight: {
            label: "Total eggs weight (g)",
            placeholder: "Total eggs weight (g)",
            xs: 12,
            md: 12,
            postfix: "g",
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
