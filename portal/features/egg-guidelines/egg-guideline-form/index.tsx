import React, { useEffect } from "react";
import * as yup from "yup";
import { Breed, House, EggGuideline } from "@/models";
import { CancelIcon, CreateNewIcon, FormLayout, HistoryIcon } from "@/lib/crud";
import { eggGuidelineApi } from "../services";
import { breedApi } from "@/features/breeds/services";
import { BreedForm } from "@/features/breeds";

const schema = yup.object({
  weight: yup.number().min(0).required(),
  week: yup.number().min(0).required(),
  egg: yup.string().min(0).required(),
  breed: yup.object().required(),
});

export const EggGuidelineForm = ({
  data,
  shallowRoute = true,
}: {
  data?: EggGuideline;
  shallowRoute?: boolean;
}) => {
  return (
    <>
      <FormLayout<EggGuideline>
        title="EggGuideline Form"
        id={data?.id || 0}
        data={data}
        schema={schema}
        shallowRoute={shallowRoute}
        createEndpoint={eggGuidelineApi.endpoints.createEggGuideline}
        updateEndpoint={eggGuidelineApi.endpoints.updateEggGuideline}
        deleteEndpoint={eggGuidelineApi.endpoints.deleteEggGuideline}
        summaryEndpoint={eggGuidelineApi.endpoints.getEggGuidelineSummary}
        beforeSubmit={(values: Partial<EggGuideline>) => {
          const cleaned_data: Partial<EggGuideline> = {
            id: values.id,
            week: values.week,
            egg: values.egg,
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
          week: { label: "Week", placeholder: "Week", xs: 12, md: 12 },
          egg: {
            label: "No of eggs",
            placeholder: "No of eggs",
            xs: 12,
            md: 12,
          },
          weight: {
            label: "Egg weight (g)",
            placeholder: "Egg weight (g)",
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
