import React, { useEffect } from "react";
import * as yup from "yup";
import { Breed, House, WeightGuideline } from "@/models";
import { CancelIcon, CreateNewIcon, FormLayout, HistoryIcon } from "@/lib/crud";
import { weightGuidelineApi } from "../services";
import { breedApi } from "@/features/breeds/services";
import { BreedForm } from "@/features/breeds";

const schema = yup.object({
  week: yup.number().min(0).required(),
  weight: yup.string().min(0).required(),
  breed: yup.object().required(),
});

export const WeightGuidelineForm = ({
  data,
  shallowRoute = true,
}: {
  data?: WeightGuideline;
  shallowRoute?: boolean;
}) => {
  return (
    <>
      <FormLayout<WeightGuideline>
        title="Body Weight Guideline"
        id={data?.id || 0}
        data={data}
        schema={schema}
        shallowRoute={shallowRoute}
        createEndpoint={weightGuidelineApi.endpoints.createWeightGuideline}
        updateEndpoint={weightGuidelineApi.endpoints.updateWeightGuideline}
        deleteEndpoint={weightGuidelineApi.endpoints.deleteWeightGuideline}
        summaryEndpoint={weightGuidelineApi.endpoints.getWeightGuidelineSummary}
        beforeSubmit={(values: Partial<WeightGuideline>) => {
          const cleaned_data: Partial<WeightGuideline> = {
            id: values.id,
            week: values.week,
            weight: values.weight,
            breed: (values.breed as Breed).id || 0,
          };

          return cleaned_data;
        }}
        fields={{
          breed: {
            label: "Breed",
            placeholder: "Breed",
            endpoint: breedApi.endpoints.getBreeds,
            form: <BreedForm />,
            xs: 12,
            md: 12,
          },
          week: {
            label: "Week",
            placeholder: "Week",
            type: "number",
            xs: 12,
            md: 12,
          },
          weight: {
            label: "Weight (g)",
            placeholder: "Weight (g)",
            type: "number",
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
