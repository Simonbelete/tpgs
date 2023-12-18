import React, { useEffect } from "react";
import * as yup from "yup";
import { Breed, House, HDEPGuideline } from "@/models";
import { CancelIcon, CreateNewIcon, FormLayout, HistoryIcon } from "@/lib/crud";
import { hDEPGuidelineApi } from "../services";
import { breedApi } from "@/features/breeds/services";
import { BreedForm } from "@/features/breeds";

const schema = yup.object({
  week: yup.number().min(0).required(),
  hDEP: yup.string().min(0).required(),
  breed: yup.object().required(),
});

export const HDEPGuidelineForm = ({
  data,
  shallowRoute = true,
}: {
  data?: HDEPGuideline;
  shallowRoute?: boolean;
}) => {
  return (
    <>
      <FormLayout<HDEPGuideline>
        title="HDEP Guideline"
        id={data?.id || 0}
        data={data}
        schema={schema}
        shallowRoute={shallowRoute}
        createEndpoint={hDEPGuidelineApi.endpoints.createHDEPGuideline}
        updateEndpoint={hDEPGuidelineApi.endpoints.updateHDEPGuideline}
        deleteEndpoint={hDEPGuidelineApi.endpoints.deleteHDEPGuideline}
        summaryEndpoint={hDEPGuidelineApi.endpoints.getHDEPGuidelineSummary}
        beforeSubmit={(values: Partial<HDEPGuideline>) => {
          const cleaned_data: Partial<HDEPGuideline> = {
            id: values.id,
            week: values.week,
            hdep: values.hdep,
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
          hdep: {
            label: "HDEP (%)",
            placeholder: "HDEP (%)",
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
