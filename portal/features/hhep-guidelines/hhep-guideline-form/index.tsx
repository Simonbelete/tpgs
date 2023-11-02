import React, { useEffect } from "react";
import * as yup from "yup";
import { Breed, House, HHEPGuideline } from "@/models";
import { CancelIcon, CreateNewIcon, FormLayout, HistoryIcon } from "@/lib/crud";
import { hHEPGuidelineApi } from "../services";
import { breedApi } from "@/features/breeds/services";
import { BreedForm } from "@/features/breeds";

const schema = yup.object({
  week: yup.number().min(0).required(),
  hhep: yup.string().min(0).required(),
  breed: yup.object().required(),
});

export const HHEPGuidelineForm = ({
  data,
  shallowRoute = true,
}: {
  data?: HHEPGuideline;
  shallowRoute?: boolean;
}) => {
  return (
    <>
      <FormLayout<HHEPGuideline>
        title="HHEPGuideline Form"
        id={data?.id || 0}
        data={data}
        schema={schema}
        shallowRoute={shallowRoute}
        createEndpoint={hHEPGuidelineApi.endpoints.createHHEPGuideline}
        updateEndpoint={hHEPGuidelineApi.endpoints.updateHHEPGuideline}
        deleteEndpoint={hHEPGuidelineApi.endpoints.deleteHHEPGuideline}
        summaryEndpoint={hHEPGuidelineApi.endpoints.getHHEPGuidelineSummary}
        beforeSubmit={(values: Partial<HHEPGuideline>) => {
          const cleaned_data: Partial<HHEPGuideline> = {
            id: values.id,
            week: values.week,
            hhep: values.hhep,
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
          hhep: {
            label: "HHEP (%)",
            placeholder: "HHEP (%)",
            xs: 12,
            md: 12,
            postfix: "%",
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
